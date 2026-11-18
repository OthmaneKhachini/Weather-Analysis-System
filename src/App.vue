<template>
  <div id="app">
    <nav>
      <div class="nav-container">
        <h2>️ 天气分析系统</h2>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/data">数据管理</router-link></li>
          <li><router-link to="/search">搜索查询</router-link></li>
          <li><router-link to="/statistics">数据统计</router-link></li>
          <li><router-link to="/about">关于项目</router-link></li>
        </ul>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
#app { min-height: 100vh; position: relative; }
main { min-height: calc(100vh - 80px); padding-bottom: 2rem; }
</style>