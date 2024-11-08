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
        
        <input id="fileInput" type="file" accept="image/*" @change="handleFileChange">
        <button type="submit" >创建商品</button>
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
      file: undefined,
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    transShowFile () {
      const fileInput = document.querySelector('#fileInput')
      fileInput.value = ''
    }
    ,
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
        this.newProduct = { name: '', price: null, stock: null, url: '', category_id: '' };
        this.transShowFile()
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
  min-height: 100vh; /* 使导航栏固定在页面顶部 */
  
}

.body-s {
  background-color: #fff;
  max-width: 600px; /* 稍微增加宽度以适应内容 */
  padding: 20px;
  border-radius: 10px;
  margin-top: 50px; /* 调整顶部边距以适应导航栏 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem; /* 增加标题大小 */
  margin-bottom: 1.5rem; /* 增加底部边距 */
  color: #333; /* 深色字体以增加对比 */
}

button {
  margin-top: 1rem;
  padding: 12px 24px; /* 增加按钮大小 */
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
  padding: 10px; /* 增加输入框内边距 */
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input[type="file"] {
  padding: 5px; /* 调整文件输入框内边距 */
}

ul {
  list-style: none; /* 移除列表默认样式 */
  padding: 0; /* 移除默认内边距 */
}

li {
  padding: 10px; /* 增加列表项内边距 */
  border-bottom: 1px solid #eee; /* 底部边框以分隔列表项 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:last-child {
  border-bottom: none; /* 最后一个列表项不显示底部边框 */
}

button.delete {
  background-color: #ff4136; /* 删除按钮的颜色 */
}

button.delete:hover {
  background-color: #d32f2f; /* 删除按钮的悬停颜色 */
}
</style>
