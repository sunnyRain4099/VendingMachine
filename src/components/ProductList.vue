<template>
  <div class="product-list-container">
    <NavBar />
    <h1 v-for="category in categories" :key="category.id" @click="() => {
      this.activeId = category.id
    }" :class="{'product-list-title': true, 'active-title': category.id === this.activeId}">{{ category.name }}</h1>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-info">
          <!-- Quantity Badge -->
          <span :class="{'quantity-badge': true, 'red': product.num}">{{ product.num || 0 }}</span>
          <span>名称：{{ product.name }}</span>
          <span>剩余：{{ product.stock }}</span>
          <span>已售：{{ product.sales }}</span>
          <span> {{ product.price }}元</span>
          <img :src="product.url" alt="">
          <span class="detail-link"><button @click="clickhhh(false, product)" class="btn"> - 1</button> <button @click="clickhhh(true, product)" class="btn"> + 1</button></span>
        </div>
      </li>
    </ul>
    <button class="buyAll" @click="buyAll">购 买</button>
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
      activeId: 1,
      buyerList: [],
      productMap: {}
    }
  },
  watch: {
    activeId: {
      immediate: true,
      handler(newId) {
        console.log(this.productMap, newId);
        this.products = this.productMap[newId];
      }
    }
  },
  created() {
    this.fetchcategoryAndProducts()
  },
  methods: {
    async fetchProducts(id) {
      try {
        const response = await axios.get(`http://localhost:8080/user/getProductByCategoryId/${id}`)
        this.productMap[id] =  response.data.data
        this.products = this.productMap[1];
      } catch (error) {
        console.error('There was an error fetching the products:', error)
      }
    },
    async fetchcategoryAndProducts() {
      try {
        const response = await axios.get('http://localhost:8080/user/categories')
        this.categories = response.data.data
        const promiseList = []
        this.categories.forEach(category => {
          promiseList.push(this.fetchProducts(category.id))
        })
        Promise.all(promiseList)
      } catch (error) {
        console.error('There was an error fetching the products:', error)
      }
    },
    async clickhhh (isAdd, product) {
      console.log('dd')
      if(isAdd) {
        if(!product.num) product.num = 0
        product.num = product.num < product.stock ? product.num + 1 : product.num
      } else {
        product.num = product.num ? product.num - 1 : 0
      }
    },
    async apiBuy(product) {
      const data = {
        product_id: product.id,
        quantity: product.num,
        total_price: product.price * product.num
      }
      await axios.post('http://localhost:8080/user/sell', data)
    },
    async apiBuyAll (productList) {
      const promiseList = []
      productList.forEach(product => {
        promiseList.push(this.apiBuy(product))
      })
      await Promise.all(promiseList)
    },
    async buyAll () {
      const productList = []
      this.categories.forEach(category => {
        this.productMap[category.id].forEach(product => {
          if(product.num) {
            productList.push(product)
          }
        })
      })
      await this.apiBuyAll(productList)
      this.fetchcategoryAndProducts()
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
  position: relative; /* Enable positioning for the badge */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.quantity-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: gray;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.red {
  background-color: red;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-info img {
  max-width: 180px;
  max-height: 180px;
  width: auto;
  height: auto;
  border-radius: 8px;
}

.detail-link {
  margin-top: 10px;
  color: #fff;
  text-decoration: none;
  .btn {
    background-color: #007bff;
    cursor: pointer;
    padding: 5px 18px;
    border-radius: 5px;
    border: 0;
    color: #fff;
    font-size: 20px;
  }
  .btn:active {
    transform: scale(0.9);
  }
}


.detail-link:hover {
  text-decoration: underline;
}
.buyAll {
  height: 80px;
  width: 200px;
  background-color: #007bff;
  font-size: 40px;
  font-weight: 800;
  color: #fff;
  border: 0;
  cursor: pointer;
  border-radius: 20px
}
.buyAll:active {
  transform: scale(0.9);
}
</style>

