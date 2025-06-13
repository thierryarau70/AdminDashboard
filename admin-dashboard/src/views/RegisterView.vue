<template>
  <div class="login-container">
    <h2>Criar Conta</h2>
    <form @submit.prevent="register" autocomplete="on">
        <div class="form-group">
        <label for="name">Nome</label>
        <input
          id="name"
          type="name"
          name="name"
          v-model="name"
          required
          placeholder="Digite seu Nome"
          autocomplete="name"
        />
      </div>
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
          placeholder="Digite uma senha"
          autocomplete="new-password"
        />
      </div>

      <button type="submit">Cadastrar</button>
      <p v-if="success" class="success">Conta criada com sucesso!</p>
      <p v-if="error" class="error">Este email já está em uso.</p>
    </form>
    <p class="back-link">
      Já tem conta? <router-link to="/login">Fazer login</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref(false)
const success = ref(false)
const router = useRouter()

function register() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  const exists = users.find((user: any) => user.email === email.value)

  if (exists) {
    error.value = true
    success.value = false
    return
  }

  users.push({ email: email.value, password: password.value , name: name.value })
  localStorage.setItem('users', JSON.stringify(users))

  error.value = false
  success.value = true

  setTimeout(() => {
    router.push('/login')
  }, 1000)
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
  background-color: #2ecc71;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}

.error {
  color: red;
  margin-top: 12px;
  text-align: center;
}

.success {
  color: green;
  margin-top: 12px;
  text-align: center;
}

.back-link {
  text-align: center;
  margin-top: 16px;
}
</style>
