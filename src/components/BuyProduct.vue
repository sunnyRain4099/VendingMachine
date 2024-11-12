<template>
    <div>
      <NavBar />
      <h1>购买商品</h1>
      <p>商品：{{ product.name }}</p>
      <p>价格：{{ product.price }}元</p>
      <p>数量：{{ quantity }}</p>
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
    mounted() {
      this.fetchProduct()
    },
    methods: {
      async fetchProduct() {
        const id = this.$route.params.id
        try {
          const response = await axios.get(`/api/user/product/${id}`)
          this.product = response.data.data
        } catch (error) {
          console.error('There was an error fetching the product:', error)
        }
      },

    }
  }
  </script>