<template>
  <div class="product-list-container">
    <NavBar />
    <h1 class="product-list-title">商品列表</h1>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-info">
          <span>名称：{{ product.name }}</span>
          <span> {{ product.price }}元</span>
          <router-link :to="`/product/${product.id}`" class="detail-link">详情</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

export default {
  name: 'ProductList',
  components: {
    NavBar
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/user/list')
        this.products = response.data.data
      } catch (error) {
        console.error('There was an error fetching the products:', error)
      }
    }
  }
}
</script>

<style>
body{
  background-image: url('@/assets/share_bg.jpg'); /* 替换为你的背景图片 URL */
}

.product-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-size: cover;
  background-position: center;
}

.product-list-title {
  text-align: center;
  color: #fff;
}

.product-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-link {
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.detail-link:hover {
  text-decoration: underline;
}
</style>

