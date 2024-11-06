<template>
  <div class="product-detail-container">
    <NavBar />
    <h1 class="product-detail-title">商品详情</h1>
    <div v-if="product" class="product-detail-info">
      <p>{{ product.name }} - {{ product.price }}元</p>
      <p>库存：{{ product.stock }}</p>
      <button v-if="product" @click="submitOrder" class="buy-button">购买</button>
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
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      const id = this.$route.params.id
      try {
        const response = await axios.get(`http://localhost:8080/user/product/${id}`)
        if (response.data.data) {
          this.product = response.data.data
          console.log(this.product)
        } else {
          console.error('没有收到产品数据')
        }
      } catch (error) {
        console.error('在获取产品时出错:', error)
      }
    },
    submitOrder() {
      const data = {
        product_id: this.product.id,
        quantity: this.quantity,
        total_price: this.product.price * this.quantity
      }
      axios.post('http://localhost:8080/user/sell', data)
        .then(() => {
          alert('购买成功！')
          this.$router.push('/')
        })
        .catch(error => {
          console.error('There was an error submitting the order:', error)
        })
    },
  }
}
</script>

<style>
.product-detail-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
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
