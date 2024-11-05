<template>
    <div>
      <NavBar />
      <h1>管理员登录</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="用户名">
        <input v-model="password" type="password" placeholder="密码">
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import NavBar from './NavBar.vue'
  
  export default {
    name: 'AdminLogin',
    components: {
      NavBar
    },
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        const data = {
          username: this.username,
          password: this.password
        }
        try {
          const response = await axios.post('http://localhost:8080/admin/login', data)
          localStorage.setItem('token', response.data.data.token)
          this.$router.push('/admin')
        } catch (error) {
          console.error('There was an error logging in:', error)
        }
      }
    }
  }
  </script>