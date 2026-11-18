<template>
  <div class="container">
    <h2>关于本项目</h2>
    
    <div class="card">
      <h3>学生信息</h3>
      <div class="about-info-grid">
        <div class="about-info-item"><p>学号</p><p style="color: var(--primary);">20230929</p></div>
        <div class="about-info-item"><p>数据集大小</p><p style="color: var(--secondary);">929 条记录</p></div>
        <div class="about-info-item"><p>项目类型</p><p style="color: var(--accent);">天气分析系统</p></div>
      </div>
    </div>

    <div class="card">
      <h3>使用的技术</h3>
      <div class="tech-grid">
        <div class="tech-item"><h4 style="color: var(--success);">前端框架</h4><p class="text-muted">Vue 3 (组合式 API)</p></div>
        <div class="tech-item"><h4 style="color: var(--info);">路由</h4><p class="text-muted">Vue Router 4</p></div>
        <div class="tech-item"><h4 style="color: var(--warning);">样式</h4><p class="text-muted">CSS3, Flexbox, Grid, 动画</p></div>
        <div class="tech-item"><h4 style="color: var(--secondary);">可视化</h4><p class="text-muted">Chart.js</p></div>
        <div class="tech-item"><h4 style="color: var(--accent);">存储</h4><p class="text-muted">LocalStorage API</p></div>
        <div class="tech-item"><h4 style="color: var(--primary);">构建工具</h4><p class="text-muted">Vite</p></div>
      </div>
    </div>

    <div class="card">
      <h3>自定义业务规则</h3>
      <div class="rules-grid">
        <div class="rule-item" style="border-left-color: var(--danger);">
          <h4 style="color: var(--danger);">规则 1：温度验证</h4>
          <p class="text-muted">温度必须在 -30°C 到 60°C 之间。无效记录将被拒绝并显示错误信息。</p>
        </div>
        <div class="rule-item" style="border-left-color: var(--warning);">
          <h4 style="color: var(--warning);">规则 2：空气质量差警报</h4>
          <p class="text-muted">当 AQI 超过 200 时，系统会自动将整行标红并显示“空气差”徽章。</p>
        </div>
        <div class="rule-item" style="border-left-color: var(--info);">
          <h4 style="color: var(--info);">规则 3：暴雨警报</h4>
          <p class="text-muted">当降雨量超过 100mm 时，会自动显示“暴雨”警告徽章。</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>项目概述</h3>
      <p class="text-muted" style="line-height: 1.8;">
        天气数据分析系统是一个全面的交互式数据可视化 Web 应用程序，旨在管理、分析和可视化气象数据。
        该系统使用 Vue 3 构建，提供无缝的单页应用 (SPA) 体验。它包含增删改查操作、高级搜索与筛选、
        交互式图表以及实时数据更新。应用程序严格执行业务规则以确保数据完整性，并为极端天气条件提供视觉警报。
      </p>
    </div>
  </div>
</template>

<script setup>
</script>