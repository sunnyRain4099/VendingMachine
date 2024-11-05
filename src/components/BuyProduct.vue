<template>
  <div>
    <NavBar />
    <h1>购买商品</h1>
    <p>商品：{{ product.name }}</p>
    <p>价格：{{ product.price }}元</p>
    <p>数量：
      <input type="number" v-model.number="quantity" min="1" :max="product.stock">
    </p>
    <p>总价：{{ product.price * quantity }}元</p>
    <button @click="submitOrder">提交订单</button>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

export default {
  name: 'BuyProduct',
  components: {
    NavBar
  },
  data() {
    return {
      product: null,
      quantity: 1
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
        this.product = response.data.data
      } catch (error) {
        console.error('There was an error fetching the product:', error)
      }
    },
    submitOrder() {
      if (this.quantity > this.product.stock) {
        alert('购买数量不能超过库存数量')
        return
      }
      const data = {
        product_id: this.product.id,
        quantity: this.quantity,
        total_price: this.product.price * this.quantity
      }
      console.log(data)
      axios.post('http://localhost:8080/user/sell', data)
        .then(() => {
          alert('购买成功！')
          this.$router.push('/')
        })
        .catch(error => {
          console.error('提交订单时出错：', error)
        })
    }
  }
}
</script>
