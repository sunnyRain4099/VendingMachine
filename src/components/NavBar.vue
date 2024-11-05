<template>
  <nav>
    <button @click="goToHome" class="nav-button">商品列表</button> |
    <button @click="goToAdminLogin" v-if="!isAdmin" class="nav-button">管理员登录</button>
    <button @click="goToAdmin" v-if="isAdmin" class="nav-button">商品管理</button>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isAdmin() {
      // 这里可以添加逻辑来判断用户是否已登录并且是管理员
      return false;
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToAdminLogin() {
      this.$router.push('/admin-login');
    },
    goToAdmin() {
      this.$router.push('/admin');
    }
  }
}
</script>

<style>
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
