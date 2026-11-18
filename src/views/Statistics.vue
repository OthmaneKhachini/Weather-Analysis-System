<template>
  <div class="container">
    <h2>统计与可视化</h2>
    
    <div class="card chart-filter-card">
      <h3>筛选图表数据</h3>
      <div class="dashboard-grid">
        <div class="form-group">
          <label>城市</label>
          <select v-model="filterCity" @change="updateCharts">
            <option value="">所有城市</option>
            <option v-for="city in uniqueCities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>天气状况</label>
          <select v-model="filterCondition" @change="updateCharts">
            <option value="">所有状况</option>
            <option>晴</option><option>多云</option><option>雨</option><option>暴风雨</option><option>雪</option>
          </select>
        </div>
        
        <div class="form-group" style="grid-column: 1 / -1;">
          <label>📅 日期范围 (温度趋势)</label>
          
          <div style="display: flex; gap: 1rem; align-items: flex-end; margin-bottom: 1rem;">
            <!-- Start Date -->
            <div style="flex: 1;">
              <label style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem; display: block; font-weight: 600;">
                开始日期
              </label>
              <input 
                type="date" 
                v-model="dateFrom" 
                @change="updateCharts"
                style="width: 100%; padding: 0.6rem; border: 2px solid var(--border-color); border-radius: 8px; background: var(--card-bg); color: var(--text-primary); font-family: inherit; font-size: 0.9rem;"
              />
            </div>
            
            <span style="font-size: 1.2rem; font-weight: bold; color: var(--text-muted); margin-bottom: 0.5rem;">至</span>
            
            <!-- End Date -->
            <div style="flex: 1;">
              <label style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem; display: block; font-weight: 600;">
                结束日期
              </label>
              <input 
                type="date" 
                v-model="dateTo" 
                @change="updateCharts"
                style="width: 100%; padding: 0.6rem; border: 2px solid var(--border-color); border-radius: 8px; background: var(--card-bg); color: var(--text-primary); font-family: inherit; font-size: 0.9rem;"
              />
            </div>
          </div>

          <!-- Quick Select Buttons -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
            <button type="button" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;" @click="setDateRange(7)">最近 7 天</button>
            <button type="button" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;" @click="setDateRange(30)">最近 30 天</button>
            <button type="button" class="btn btn-warning" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;" @click="setDateRange(365)">最近 1 年</button>
            <button type="butto n" class="btn btn-secondary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;" @click="clearDateRange()">清除日期</button>
          </div>

          <!-- Date Range Display -->
          <div v-if="dateFrom || dateTo" class="date-range-display" style="margin-top: 1rem; padding: 0.75rem; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 4px solid #6366f1;">
            <span style="font-size: 0.85rem; color: var(--text-primary);">
              <strong>当前范围:</strong> 
              {{ dateFrom ? formatDateDisplay(dateFrom) : '开始' }} 
              → 
              {{ dateTo ? formatDateDisplay(dateTo) : '结束' }}
              <button 
                type="button" 
                @click="clearDateRange" 
                style="margin-left: 1rem; padding: 0.2rem 0.6rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); color: #ef4444; border: none; border-radius: 4px; cursor: pointer;"
              >
                ✕ 清除
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-grid">
      <div class="chart-container"><h3>温度随时间变化趋势</h3><canvas id="tempLineChart"></canvas></div>
      <div class="chart-container"><h3>天气状况频率</h3><canvas id="conditionBarChart"></canvas></div>
      <div class="chart-container"><h3>湿度分布</h3><canvas id="humidityChart"></canvas></div>
      <div class="chart-container"><h3>各城市降雨量</h3><canvas id="rainfallChart"></canvas></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { loadFromLocalStorage } from '../services/DataService';

const dataset = ref([]);
const filterCity = ref('');
const filterCondition = ref('');
const dateFrom = ref('');
const dateTo = ref('');
const uniqueCities = ref([]);
let lineChartInstance = null, barChartInstance = null, humidityChartInstance = null, rainfallChartInstance = null;

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

onMounted(() => {
  dataset.value = loadFromLocalStorage();
  uniqueCities.value = [...new Set(dataset.value.map(r => r.city))];
  initCharts();
  updateCharts();
});

watch([filterCity, filterCondition, dateFrom, dateTo], () => updateCharts());

function setDateRange(days) {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - days);

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  dateTo.value = formatDate(today);
  dateFrom.value = formatDate(past);
  updateCharts();
}

function clearDateRange() {
  dateFrom.value = '';
  dateTo.value = '';
  updateCharts();
}

function updateCharts() {
  let filteredData = dataset.value;
  
  // City filter
  if (filterCity.value) filteredData = filteredData.filter(r => r.city === filterCity.value);
  
  // Condition filter
  if (filterCondition.value) filteredData = filteredData.filter(r => r.condition === filterCondition.value);
  
  // Date range filter
  if (dateFrom.value) filteredData = filteredData.filter(r => r.date >= dateFrom.value);
  if (dateTo.value) filteredData = filteredData.filter(r => r.date <= dateTo.value);

  // Prepare chart data
  const lineLabels = filteredData.slice(0, 50).map(r => r.date);
  const lineData = filteredData.slice(0, 50).map(r => r.temperature);
  const conditions = ['晴', '多云', '雨', '暴风雨', '雪'];
  const barData = conditions.map(cond => filteredData.filter(r => r.condition === cond).length);
  const humidityData = [
    filteredData.filter(r => r.humidity <= 20).length,
    filteredData.filter(r => r.humidity > 20 && r.humidity <= 40).length,
    filteredData.filter(r => r.humidity > 40 && r.humidity <= 60).length,
    filteredData.filter(r => r.humidity > 60 && r.humidity <= 80).length,
    filteredData.filter(r => r.humidity > 80).length
  ];
  const cities = [...new Set(filteredData.map(r => r.city))];
  const rainfallData = cities.map(city => {
    const cityData = filteredData.filter(r => r.city === city);
    return cityData.reduce((sum, r) => sum + r.rainfall, 0) / cityData.length;
  });

  // Update charts
  if (lineChartInstance) { 
    lineChartInstance.data.labels = lineLabels; 
    lineChartInstance.data.datasets[0].data = lineData; 
    lineChartInstance.update(); 
  }
  if (barChartInstance) { 
    barChartInstance.data.labels = conditions; 
    barChartInstance.data.datasets[0].data = barData; 
    barChartInstance.update(); 
  }
  if (humidityChartInstance) { 
    humidityChartInstance.data.datasets[0].data = humidityData; 
    humidityChartInstance.update(); 
  }
  if (rainfallChartInstance) { 
    rainfallChartInstance.data.labels = cities; 
    rainfallChartInstance.data.datasets[0].data = rainfallData; 
    rainfallChartInstance.update(); 
  }
}

function initCharts() {
  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: true,
    plugins: { 
      legend: { 
        labels: { 
          color: '#cbd5e1', 
          font: { size: 12, family: 'Inter' } 
        } 
      } 
    },
    scales: { 
      x: { 
        ticks: { color: '#94a3b8' }, 
        grid: { color: 'rgba(148, 163, 184, 0.1)' } 
      }, 
      y: { 
        ticks: { color: '#94a3b8' }, 
        grid: { color: 'rgba(148, 163, 184, 0.1)' } 
      } 
    }
  };

  lineChartInstance = new Chart(document.getElementById('tempLineChart').getContext('2d'), {
    type: 'line', 
    data: { 
      labels: [], 
      datasets: [{ 
        label: '温度 (°C)', 
        data: [], 
        borderColor: '#6366f1', 
        backgroundColor: 'rgba(99, 102, 241, 0.1)', 
        fill: true, 
        tension: 0.4, 
        borderWidth: 3 
      }] 
    }, 
    options: chartOptions
  });

  barChartInstance = new Chart(document.getElementById('conditionBarChart').getContext('2d'), {
    type: 'bar', 
    data: { 
      labels: [], 
      datasets: [{ 
        label: '频率', 
        data: [], 
        backgroundColor: [
          'rgba(245,158,11,0.8)', 
          'rgba(148,163,184,0.8)', 
          'rgba(59,130,246,0.8)', 
          'rgba(99,102,241,0.8)', 
          'rgba(203,213,225,0.8)'
        ], 
        borderWidth: 0, 
        borderRadius: 8 
      }] 
    }, 
    options: chartOptions
  });

  humidityChartInstance = new Chart(document.getElementById('humidityChart').getContext('2d'), {
    type: 'doughnut', 
    data: { 
      labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'], 
      datasets: [{ 
        data: [], 
        backgroundColor: [
          'rgba(16,185,129,0.8)', 
          'rgba(6,182,212,0.8)', 
          'rgba(59,130,246,0.8)', 
          'rgba(139,92,246,0.8)', 
          'rgba(236,72,153,0.8)'
        ], 
        borderWidth: 0 
      }] 
    }, 
    options: { 
      responsive: true, 
      plugins: { 
        legend: { 
          labels: { color: '#cbd5e1' } 
        } 
      } 
    }
  });

  rainfallChartInstance = new Chart(document.getElementById('rainfallChart').getContext('2d'), {
    type: 'bar', 
    data: { 
      labels: [], 
      datasets: [{ 
        label: '平均降雨量 (mm)', 
        data: [], 
        backgroundColor: 'rgba(6,182,212,0.8)', 
        borderWidth: 0, 
        borderRadius: 8 
      }] 
    }, 
    options: chartOptions
  });
}
</script>