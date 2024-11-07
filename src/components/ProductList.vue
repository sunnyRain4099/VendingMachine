<template>
  <div class="product-list-container">
    <NavBar />
    <h1 v-for="category in categories" :key="category.id" @click="() => {
      this.activeId = category.id
    }" :class="{'product-list-title': true, 'active-title': category.id === this.activeId}">{{ category.name }}</h1>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-info">
          <span>名称：{{ product.name }}</span>
          <span>剩余：{{ product.stock }}</span>
          <span>已售：{{ product.sales }}</span>
          <span> {{ product.price }}元</span>
          <img :src="product.url" alt="">
          <router-link :to="`/product/${product.id}`" class="detail-link">购买</router-link>
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
      products: [],
      categories: [],
      activeId: 1
    }
  },
  watch: {
    activeId: {
      immediate: true,
      handler(newId) {
        this.fetchProducts(newId)
      }
    }
  },
  created() {
    this.fetchcategory()
  },
  methods: {
    async fetchProducts(id) {
      try {
        const response = await axios.get(`http://localhost:8080/user/getProductByCategoryId/${id}`)
        this.products = response.data.data
      } catch (error) {
        console.error('There was an error fetching the products:', error)
      }
    },
    async fetchcategory() {
      try {
        const response = await axios.get('http://localhost:8080/user/categories')
        this.categories = response.data.data
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
  display: inline-block;
  text-align: center;
  color: #fff;
  padding: 0 2px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: #007bff;
  cursor: pointer;
}
.active-title {
  background-color: pink;
}
.product-list-title:active {
  transform: scale(1.1);
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
  img {
    max-width: 180px; /* 设置最大宽度 */
    max-height: 180px; /* 设置最大高度 */
    width: auto; /* 根据实际图片宽高比自动调整 */
    height: auto; /* 根据实际图片宽高比自动调整 */
    border-radius: 8px; /* 可选，添加圆角 */
  }
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

