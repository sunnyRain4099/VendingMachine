<template>
    <div>
      <NavBar />
      <h1>商品管理</h1>
      <button @click="fetchProducts">刷新商品列表</button>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }}元
          <button @click="deleteProduct(product.id)">删除</button>
        </li>
      </ul>
      <form @submit.prevent="createProduct">
        <input v-model="newProduct.name" type="text" placeholder="商品名称">
        <input v-model="newProduct.price" type="number" placeholder="价格">
        <input v-model="newProduct.stock" type="number" placeholder="库存">
        <button type="submit">创建商品</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import NavBar from './NavBar.vue'
  
  export default {
    name: 'AdminProductList',
    components: {
      NavBar
    },
    data() {
      return {
        products: [],
        newProduct: {
          name: '',
          price: 0,
          stock: 0
        },
        token: localStorage.getItem('token')
      }
    },
    created() {
      this.fetchProducts()
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('http://localhost:8080/admin/list', {headers: {
            token: this.token
          }})
          this.products = response.data.data
        } catch (error) {
          console.error('There was an error fetching the products:', error)
        }
      },
      async deleteProduct(id) { 
        try {
          await axios.delete(`http://localhost:8080/admin/${id}` , {headers: {
            token: this.token
          }})
          this.products = this.products.filter(product => product.id !== id)
        } catch (error) {
          console.error('There was an error deleting the product:', error)
        }
      },
      async createProduct() {
        try {
          const response = await axios.post('http://localhost:8080/admin', {
            ... this.newProduct
          }, {headers: {
            token: this.token
          }})
          this.products.push(response.data.data)
          this.newProduct.name = ''
          this.newProduct.price = 0
          this.newProduct.stock = 0
        } catch (error) {
          console.error('There was an error creatingthe product:', error)
}
}
}
}
</script>