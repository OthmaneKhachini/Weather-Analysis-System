const STORAGE_KEY = 'weather_data_20230929';

function generateDataset() {
  const cities = ['纽约', '伦敦', '东京', '悉尼', '巴黎', '柏林', '多伦多', '孟买'];
  const conditions = ['晴', '多云', '雨', '暴风雨', '雪'];
  const data = [];
  
  // 严格生成 929 条记录
  for (let i = 1; i <= 929; i++) {
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() + (i % 365));
    
    data.push({
      id: i,
      date: date.toISOString().split('T')[0],
      city: cities[Math.floor(Math.random() * cities.length)],
      temperature: Math.floor(Math.random() * 91) - 30, // -30 到 60
      humidity: Math.floor(Math.random() * 101),
      rainfall: Math.floor(Math.random() * 150),
      windSpeed: Math.floor(Math.random() * 100),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      aqi: Math.floor(Math.random() * 301)
    });
  }
  return data;
}

export function loadFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const initialData = generateDataset();
  saveToLocalStorage(initialData);
  return initialData;
}

export function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addWeatherRecord(record, dataset) {
  // 业务规则 1：温度验证
  if (record.temperature < -30 || record.temperature > 60) {
    throw new Error("温度必须在 -30°C 到 60°C 之间");
  }
  const newRecord = { ...record, id: Date.now() };
  dataset.push(newRecord);
  saveToLocalStorage(dataset);
  return dataset;
}

export function editWeatherRecord(id, updatedRecord, dataset) {
  // 业务规则 1：温度验证
  if (updatedRecord.temperature < -30 || updatedRecord.temperature > 60) {
    throw new Error("温度必须在 -30°C 到 60°C 之间");
  }
  const index = dataset.findIndex(r => r.id === id);
  if (index !== -1) {
    dataset[index] = { ...updatedRecord, id };
    saveToLocalStorage(dataset);
  }
  return dataset;
}

export function deleteWeatherRecord(id, dataset) {
  const filtered = dataset.filter(r => r.id !== id);
  saveToLocalStorage(filtered);
  return filtered;
}

export function searchWeatherData(query, dataset) {
  const lowerQuery = query.toLowerCase();
  return dataset.filter(r => 
    r.city.toLowerCase().includes(lowerQuery) ||
    r.condition.toLowerCase().includes(lowerQuery) ||
    r.date.includes(lowerQuery)
  );
}

export function sortWeatherData(dataset, key, order = 'asc') {
  return [...dataset].sort((a, b) => {
    if (order === 'asc') return a[key] > b[key] ? 1 : -1;
    return a[key] < b[key] ? 1 : -1;
  });
}