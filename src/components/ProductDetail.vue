<template>
  <div class="product-detail-container">
    <NavBar />
    <h1 class="product-detail-title">商品详情</h1>
    <div v-if="product" class="product-detail-info">
      <p>{{ product.name }} - {{ product.price }}元</p>
      <p>库存：{{ product.stock }}</p>
      <button v-if="product" @click="goToBuyPage" class="buy-button">购买</button>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NavBar from './NavBar.vue'

const product = ref(null)

const fetchProduct = async () => {
  const id = window.location.pathname.split('/').pop()
  try {
    const response = await axios.get(`http://localhost:8080/user/product/${id}`)
    product.value = response.data.data
  } catch (error) {
    console.error('There was an error fetching the product:', error)
  }
}

const goToBuyPage = () => {
  if (product.value && product.value.id) {
    window.location.href = `/buy/${product.value.id}`
  } else {
    console.error('产品未加载，无法跳转到购买页面')
  }
}

onMounted(fetchProduct)
</script>

<style>
.product-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-detail-title {
  text-align: center;
  color: #333;
}

.product-detail-info {
  margin-top: 20px;
  text-align: center;
}

.buy-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #0056b3;
}
</style>
