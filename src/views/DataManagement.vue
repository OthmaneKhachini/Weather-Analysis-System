<template>
  <div class="container">
    <h2>数据管理</h2>
    
    <button id="vanilla-refresh-btn" class="btn btn-primary mb-3 vanilla-test-btn">
      原生 JS 刷新测试
    </button>
    
    <div class="card">
      <h3>{{ editingId ? '编辑记录' : '添加新记录' }}</h3>
      <form @submit.prevent="handleSubmit">
        <div class="dashboard-grid">
          <div class="form-group">
            <label>城市</label>
            <input v-model="form.city" required placeholder="输入城市名称" />
          </div>
          <div class="form-group">
            <label>日期</label>
            <input type="date" v-model="form.date" required />
          </div>
          <div class="form-group">
            <label>温度 (°C)</label>
            <input type="number" v-model.number="form.temperature" required placeholder="-30 到 60" />
          </div>
          <div class="form-group">
            <label>湿度 (%)</label>
            <input type="number" v-model.number="form.humidity" required placeholder="0 到 100" />
          </div>
          <div class="form-group">
            <label>降雨量 (mm)</label>
            <input type="number" v-model.number="form.rainfall" required placeholder="0 到 150" />
          </div>
          <div class="form-group">
            <label>风速 (km/h)</label>
            <input type="number" v-model.number="form.windSpeed" required placeholder="0 到 100" />
          </div>
          <div class="form-group">
            <label>天气状况</label>
            <select v-model="form.condition" required>
              <option value="">选择天气状况</option>
              <option>晴</option>
              <option>多云</option>
              <option>雨</option>
              <option>暴风雨</option>
              <option>雪</option>
            </select>
          </div>
          <div class="form-group">
            <label>空气质量指数 (AQI)</label>
            <input type="number" v-model.number="form.aqi" required placeholder="0 到 300" />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          {{ editingId ? '更新记录' : '添加记录' }}
        </button>
        <button v-if="editingId" type="button" class="btn btn-danger" @click="resetForm" style="margin-left: 0.75rem;">
          取消
        </button>
      </form>
    </div>

    <div class="table-container">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>日期</th><th>城市</th><th>温度</th><th>天气</th><th>AQI</th><th>降雨量</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in dataset" :key="record.id" :class="{ 'poor-aqi': record.aqi > 200 }">
              <td>{{ record.id }}</td>
              <td>{{ record.date }}</td>
              <td>{{ record.city }}</td>
              <td>{{ record.temperature }}°C</td>
              <td>{{ record.condition }}</td>
              <td>
                {{ record.aqi }}
                <span v-if="record.aqi > 200" class="badge badge-danger">空气差</span>
              </td>
              <td>
                {{ record.rainfall }}mm
                <span v-if="record.rainfall > 100" class="badge badge-warning">暴雨</span>
              </td>
              <td>
                <div class="data-table-actions">
                  <button class="btn btn-primary" @click="startEdit(record)">编辑</button>
                  <button class="btn btn-danger" @click="handleDelete(record.id)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <p class="text-muted mt-2 text-center">总记录数: <strong>{{ dataset.length }}</strong></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadFromLocalStorage, addWeatherRecord, editWeatherRecord, deleteWeatherRecord } from '../services/DataService';
import { showNotification, attachVanillaEvents } from '../services/domUtils';

const dataset = ref([]);
const editingId = ref(null);
const form = ref({ city: '', date: '', temperature: 0, humidity: 0, rainfall: 0, windSpeed: 0, condition: '', aqi: 0 });

onMounted(() => {
  dataset.value = loadFromLocalStorage();
  attachVanillaEvents();
});

const handleSubmit = () => {
  try {
    if (editingId.value) {
      dataset.value = editWeatherRecord(editingId.value, form.value, dataset.value);
      showNotification('记录更新成功！');
    } else {
      dataset.value = addWeatherRecord(form.value, dataset.value);
      showNotification('记录添加成功！');
    }
    resetForm();
  } catch (error) {
    showNotification(error.message, 'error');
  }
};

const startEdit = (record) => {
  editingId.value = record.id;
  form.value = { ...record };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleDelete = (id) => {
  if (confirm('确定要删除这条记录吗？')) {
    dataset.value = deleteWeatherRecord(id, dataset.value);
    showNotification('记录已删除。');
  }
};

const resetForm = () => {
  editingId.value = null;
  form.value = { city: '', date: '', temperature: 0, humidity: 0, rainfall: 0, windSpeed: 0, condition: '', aqi: 0 };
};
</script>