<template>
  <div class="container">
    <h2>搜索与筛选数据</h2>
    
    <div class="card">
      <h3>搜索与排序选项</h3>
      <div class="dashboard-grid">
        <div class="form-group">
          <label>文本搜索 (城市、天气、日期)</label>
          <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="输入关键字搜索..." />
        </div>
        <div class="form-group">
          <label>排序方式</label>
          <select v-model="sortKey" @change="handleSearch">
            <option value="date">日期</option>
            <option value="temperature">温度</option>
            <option value="humidity">湿度</option>
            <option value="rainfall">降雨量</option>
            <option value="aqi">AQI</option>
          </select>
        </div>
        <div class="form-group">
          <label>排序顺序</label>
          <select v-model="sortOrder" @change="handleSearch">
            <option value="asc">升序</option>
            <option value="desc">降序</option>
          </select>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem;">范围筛选</h3>
      <div class="dashboard-grid">
        <div class="form-group">
          <label>温度范围 (°C)</label>
          <div class="range-filter-group">
            <input type="number" v-model.number="tempMin" @input="handleSearch" placeholder="最小值" />
            <input type="number" v-model.number="tempMax" @input="handleSearch" placeholder="最大值" />
          </div>
        </div>
        <div class="form-group">
          <label>湿度范围 (%)</label>
          <div class="range-filter-group">
            <input type="number" v-model.number="humMin" @input="handleSearch" placeholder="最小值" />
            <input type="number" v-model.number="humMax" @input="handleSearch" placeholder="最大值" />
          </div>
        </div>
        <div class="form-group">
          <label>AQI 范围</label>
          <div class="range-filter-group">
            <input type="number" v-model.number="aqiMin" @input="handleSearch" placeholder="最小值" />
            <input type="number" v-model.number="aqiMax" @input="handleSearch" placeholder="最大值" />
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>ID</th><th>日期</th><th>城市</th><th>温度</th><th>天气</th><th>AQI</th><th>降雨量</th><th>风速</th></tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredData" :key="record.id" :class="{ 'poor-aqi': record.aqi > 200 }">
              <td>{{ record.id }}</td><td>{{ record.date }}</td><td>{{ record.city }}</td>
              <td>{{ record.temperature }}°C</td><td>{{ record.condition }}</td>
              <td>{{ record.aqi }} <span v-if="record.aqi > 200" class="badge badge-danger">空气差</span></td>
              <td>{{ record.rainfall }}mm <span v-if="record.rainfall > 100" class="badge badge-warning">暴雨</span></td>
              <td>{{ record.windSpeed }} km/h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="search-results-info">显示 <strong>{{ filteredData.length }}</strong> 条，共 <strong>{{ dataset.length }}</strong> 条记录</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadFromLocalStorage, sortWeatherData } from '../services/DataService';

const dataset = ref([]);
const filteredData = ref([]);
const searchQuery = ref('');
const sortKey = ref('date');
const sortOrder = ref('asc');
const tempMin = ref(null); const tempMax = ref(null);
const humMin = ref(null); const humMax = ref(null);
const aqiMin = ref(null); const aqiMax = ref(null);

onMounted(() => {
  dataset.value = loadFromLocalStorage();
  filteredData.value = dataset.value;
});

const handleSearch = () => {
  let result = dataset.value;
  if (searchQuery.value) {
    const lowerQuery = searchQuery.value.toLowerCase();
    result = result.filter(r => r.city.toLowerCase().includes(lowerQuery) || r.condition.toLowerCase().includes(lowerQuery) || r.date.includes(lowerQuery));
  }
  result = result.filter(r => {
    let pass = true;
    if (tempMin.value !== null && tempMin.value !== '') pass = pass && r.temperature >= Number(tempMin.value);
    if (tempMax.value !== null && tempMax.value !== '') pass = pass && r.temperature <= Number(tempMax.value);
    if (humMin.value !== null && humMin.value !== '') pass = pass && r.humidity >= Number(humMin.value);
    if (humMax.value !== null && humMax.value !== '') pass = pass && r.humidity <= Number(humMax.value);
    if (aqiMin.value !== null && aqiMin.value !== '') pass = pass && r.aqi >= Number(aqiMin.value);
    if (aqiMax.value !== null && aqiMax.value !== '') pass = pass && r.aqi <= Number(aqiMax.value);
    return pass;
  });
  filteredData.value = sortWeatherData(result, sortKey.value, sortOrder.value);
};
</script>