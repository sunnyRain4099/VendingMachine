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

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

export default {
  name: 'ProductDetail',
  components: {
    NavBar
  },
  data() {
    return {
      product: null
    }
  },
  created() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      const id = this.$route.params.id
      try {
        const response = await axios.get(`http://localhost:8080/user/product/${id}`)
        if (response.data.data) {
          this.product = response.data.data
        } else {
          console.error('没有收到产品数据')
        }
      } catch (error) {
        console.error('在获取产品时出错:', error)
      }
    },
    goToBuyPage() {
      if (this.product && this.product.id) {
    this.$router.push(`/buy/${this.product.id}`);
  } else {
    console.error('产品未加载，无法跳转到购买页面');
    // 这里可以添加一个错误处理，例如显示一个消息给用户
  }
    }
  }
}
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
