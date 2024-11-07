<template>
  <div class="body-f">
    <NavBar />
    <div class="body-s">
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
        
        <!-- 添加商品类型的选择框 -->
        <select v-model="newProduct.category_id">
          <option value="" disabled>选择商品类型</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        
        <input type="file" accept="image/*" @change="handleFileChange">
        <button type="submit">创建商品</button>
      </form>
    </div>
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
      categories: [],
      newProduct: {
        name: '',
        price: '',
        stock: '',
        url: '',
        sales: 0,
        category_id: '' // 添加商品类型 ID
      },
      token: localStorage.getItem('token'),
      file: undefined
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/admin/list', {
          headers: { token: this.token }
        });
        this.products = response.data.data;
      } catch (error) {
        console.error('There was an error fetching the products:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8080/user/categories');
        this.categories = response.data.data;
      } catch (error) {
        console.error('There was an error fetching the categories:', error);
      }
    },
    async deleteProduct(id) { 
      try {
        await axios.delete(`http://localhost:8080/admin/${id}`, {
          headers: { token: this.token }
        });
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error('There was an error deleting the product:', error);
      }
    },
    async createProduct() {
      try {
        // 上传文件
        const formData = new FormData();
        formData.append('file', this.file);
        const uploadResponse = await axios.post('http://localhost:8080/admin/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: this.token
          }
        });
        
        // 将上传后的文件 URL 赋值给新商品
        this.newProduct.url = uploadResponse.data.data;
        console.log(this.newProduct, '上传')
        // 创建商品
        const response = await axios.post('http://localhost:8080/admin', {
          ...this.newProduct
        }, {
          headers: { token: this.token }
        });
        
        this.products.push(response.data.data);
        
        // 重置表单
        this.newProduct = { name: '', price: 0, stock: 0, url: '', category_id: '' };
        this.file = undefined;
        
      } catch (error) {
        console.error('There was an error creating the product:', error);
      }
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
    }
  }
};
</script>

<style scoped>
.body-f {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.body-s {
  background-color: #fff;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  margin-top: 100px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

input, select {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input[type="file"] {
  padding: 3px;
}
</style>
