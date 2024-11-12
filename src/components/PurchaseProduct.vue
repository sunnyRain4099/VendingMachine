<template>
  <div>
    <NavBar />
    <h1>购买商品</h1>
    <div v-if="loading">
      <p>加载中...</p>
    </div>
    <div v-else>
      <p>商品：{{ product.name }}</p>
      <p>价格：{{ product.price }}元</p>
      <p>数量：
        <input type="number" v-model.number="quantity" min="1" />
      </p>
      <button @click="purchase" :disabled="!product || quantity < 1">购买</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavBar from './NavBar.vue';

const product = ref(null);
const quantity = ref(1);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  await fetchProduct();
  loading.value = false;
});

async function fetchProduct() {
  const id = 'your-product-id'; // 这里应该使用路由参数获取产品ID
  try {
    const response = await axios.get(`/api/user/product/${id}`);
    product.value = response.data.data;
  } catch (error) {
    console.error('There was an error fetching the product:', error);
    error.value = '无法加载商品信息';
  }
}

async function purchase() {
  if (!product.value || quantity.value < 1) {
    error.value = '请输入有效的数量';
    return;
  }

  const data = {
    product_id: product.value.id,
    quantity: quantity.value,
    total_price: product.value.price * quantity.value
  };

  try {
    await axios.post('/api/user/sell', data);
    alert('购买成功');
    // 可以在这里添加逻辑，比如清空表单或跳转到其他页面
  } catch (error) {
    console.error('There was an error purchasing the product:', error);
    error.value = '购买失败，请稍后再试';
  }
}
</script>

<style scoped>
/* 添加一些基本样式 */
input[type="number"] {
  width: 50px;
  padding: 5px;
  margin: 5px 0;
}

.nav-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #0056b3;
}
</style>