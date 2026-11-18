import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import DataManagement from '../views/DataManagement.vue';
import Search from '../views/Search.vue';
import Statistics from '../views/Statistics.vue';
import About from '../views/About.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/data', name: 'DataManagement', component: DataManagement },
  { path: '/search', name: 'Search', component: Search },
  { path: '/statistics', name: 'Statistics', component: Statistics },
  { path: '/about', name: 'About', component: About }
];

export default createRouter({
  history: createWebHistory(),
  routes
});