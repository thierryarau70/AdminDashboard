<template>
    
  <div class="settings-container">
     <button class="voltar-btn" @click="voltar">Voltar</button>
    <h2>Configurações da Conta</h2>

    <form @submit.prevent="updateInfo">
      <div class="form-group">
        <label>Nome</label>
        <input v-model="name" type="text" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>Nova senha</label>
        <input v-model="password" type="password" placeholder="Deixe em branco para não mudar" />
      </div>

      <button type="submit">Salvar alterações</button>
    </form>

    <hr />

    <button class="delete-btn" @click="confirmDelete">Excluir minha conta</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = JSON.parse(localStorage.getItem('user') || '{}')

const name = ref(userData.name || '')
const email = ref(userData.email || '')
const password = ref('')

function updateInfo() {
  const updatedUser = {
    ...userData,
    name: name.value,
    email: email.value,
    password: password.value || userData.password
  }
  localStorage.setItem('user', JSON.stringify(updatedUser))
  alert('Dados atualizados com sucesso!')
}

function confirmDelete() {
  if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')
    router.push('/login')
  }
}

function voltar() {
  router.push('/settings')
}
</script>

<style scoped>
.settings-container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
h2 {
  margin-bottom: 24px;
}
.form-group {
  margin-bottom: 16px;
}
input {
  width: 90%;
  padding: 10px;
  font-size: 14px;
  text-align: center;
}
button {
  padding: 10px 16px;
  border: none;
  background: #1abc9c;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #16a085;
}
.delete-btn {
  background-color: #e74c3c;
  margin-top: 20px;
}
.delete-btn:hover {
  background-color: #c0392b;
}

.voltar-btn {
  background-color: #8f8d8d;
  text-align: center;
}
.voltar-btn:hover {
  background-color: #7c7878;
}
</style>
