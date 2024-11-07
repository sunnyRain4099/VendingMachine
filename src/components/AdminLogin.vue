<template>
  <div>
    <NavBar />
    <div class="form-f">
      <div class="login-form">
        <h1>管理员登录</h1>
        <form @submit.prevent="login">
          <input v-model="username" type="text" placeholder="用户名" class="input-field" />
          <input v-model="password" type="password" placeholder="密码" class="input-field" />
          <button type="submit" class="submit-button">登录</button>
        </form>
      </div>
    </div>
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
        username: 'root',
        password: '123456'
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

<style scoped>
.form-f {
  display: flex;
  justify-content: center;
}
.login-form {
  margin-top: 100px;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0px 0px 4px rgba(0, 123, 255, 0.3);
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:active {
  background-color: #004494;
}
</style>