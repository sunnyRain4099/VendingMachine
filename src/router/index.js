import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ProductDetail from '../components/ProductDetail.vue';
import BuyProduct from '../components/BuyProduct.vue';
import AdminLogin from '../components/AdminLogin.vue';
import AdminProductList from '../components/AdminProductList.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetail, name: 'ProductDetail' },
  { path: '/buy/:id', component: BuyProduct, name: 'BuyProduct' },
  { path: '/admin-login', component: AdminLogin },
  { path: '/admin', component: AdminProductList },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;