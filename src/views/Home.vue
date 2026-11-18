<template>
  <div class="container">
    <h1>天气数据分析系统</h1>
    <p class="text-muted mb-3" style="font-size: 1.1rem;">
      学号: 20230929 | 交互式天气分析仪表板
    </p>
    
    <div class="home-hero-image">
      <img src="https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80" alt="天气分析仪表板" />
    </div>

    <div class="dashboard-grid">
      <div class="stats-card">
        <h3>数据集大小</h3>
        <div class="value">929 条记录</div>
      </div>
      <div class="stats-card">
        <h3>追踪城市</h3>
        <div class="value">{{ citiesCount }}</div>
      </div>
      <div class="stats-card">
        <h3>平均温度</h3>
        <div class="value">{{ avgTemp }}°C</div>
      </div>
      <div class="stats-card">
        <h3>存储方式</h3>
        <div class="value">本地存储</div>
      </div>
    </div>

    <div class="card">
      <h3>快捷操作</h3>
      <div class="dashboard-grid" style="margin-top: 1rem;">
        <router-link to="/data" class="btn btn-success">管理数据</router-link>
        <router-link to="/search" class="btn btn-primary">搜索与筛选</router-link>
        <router-link to="/statistics" class="btn btn-danger">查看图表</router-link>
        <router-link to="/about" class="btn btn-warning">关于项目</router-link>
      </div>
    </div>

    <div class="card">
      <h3>核心功能</h3>
      <div class="dashboard-grid" style="margin-top: 1rem;">
        <div class="feature-item">
          <h4 style="color: var(--primary);">929 条天气记录</h4>
          <p class="text-muted">基于学号生成的专属数据集</p>
        </div>
        <div class="feature-item">
          <h4 style="color: var(--secondary);">增删改查操作</h4>
          <p class="text-muted">创建、读取、更新、删除天气数据</p>
        </div>
        <div class="feature-item">
          <h4 style="color: var(--accent);">高级搜索</h4>
          <p class="text-muted">按城市、天气、日期等条件筛选</p>
        </div>
        <div class="feature-item">
          <h4 style="color: var(--success);">交互式图表</h4>
          <p class="text-muted">使用 Chart.js 绘制的折线图、柱状图和环形图</p>
        </div>
        <div class="feature-item">
          <h4 style="color: var(--warning);">业务规则</h4>
          <p class="text-muted">温度验证、AQI 警报、降雨警告</p>
        </div>
        <div class="feature-item">
          <h4 style="color: var(--info);">本地存储</h4>
          <p class="text-muted">浏览器中的持久化数据存储</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadFromLocalStorage } from '../services/DataService';

const citiesCount = ref(0);
const avgTemp = ref(0);

onMounted(() => {
  const data = loadFromLocalStorage();
  citiesCount.value = new Set(data.map(r => r.city)).size;
  avgTemp.value = Math.round(data.reduce((sum, r) => sum + r.temperature, 0) / data.length);
});
</script>