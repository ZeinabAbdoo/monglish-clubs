import { createRouter, createWebHistory } from 'vue-router';

import HomeEn from '../components/en/ClubsLanding.vue';
import HomeAr from '../components/ar/ClubsLanding.vue';
import CartEn from '../components/en/CartPage.vue';
import CartAr from '../components/ar/CartPage.vue';

const englishRoutes = [
  { path: '/en/', name: 'HomeEn', component: HomeEn  , meta: {
    reload: true,
  },},
  { path: '/en/cart/', name: 'CartEn', component: CartEn ,  meta: {
    reload: true,
  },}
];

const arabicRoutes = [
  { path: '/', name: 'HomeAr', component: HomeAr ,  meta: {
    reload: true,
  },},
  { path: '/ar/cart/', name: 'CartAr', component: CartAr ,  meta: {
    reload: true,
  },}
];

const routes = [
  ...englishRoutes,
  ...arabicRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;