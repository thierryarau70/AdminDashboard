<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" autocomplete="on">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          required
          placeholder="Digite seu email"
          autocomplete="email"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          required
          placeholder="Digite sua senha"
          autocomplete="current-password"
        />
      </div>

      <button type="submit">Entrar</button>
      <p v-if="error" class="error">Email ou senha incorretos</p>
      
    </form>
 <p class="register-link">
      Não tem uma conta?
      <router-link to="/register">Criar conta</router-link>
    </p>
   
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()


function login() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  console.log('Usuários cadastrados:', users)

  const match = users.find((user: any) => user.email === email.value && user.password === password.value)
  console.log('Tentativa de login com:', email.value, password.value)

  if (match) {
    console.log('Login bem-sucedido:', match)
    localStorage.setItem('loggedIn', 'true')
    localStorage.setItem('currentUser', JSON.stringify(match))
    error.value = false
    router.push('/')
  } else {
    console.warn('Login falhou: email ou senha incorretos')
    error.value = true
  }
}


</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 100px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 12px;
  text-align: center;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}
</style>
