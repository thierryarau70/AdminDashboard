<template>
  <header class="header">
    <h1>Painel Administrativo</h1>
    <div class="right-side">
      <div class="user-info" v-if="user">
        <span>{{ user.name }} ({{ user.role }})</span>
        <button @click="logout">Sair</button>
      </div>
      <div class="datetime">{{ dateTime }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth/useAuth' // ajuste o caminho se estiver diferente

const { user } = useAuth()
const router = useRouter()

function logout() {
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('currentUser')
  router.push('/login')
}

const dateTime = ref('')

function updateDateTime() {
  const now = new Date()
  dateTime.value = now.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

let intervalId: number

onMounted(() => {
  updateDateTime()
  intervalId = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.header {
  background-color: #1abc9c;
  padding: 20px;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  margin-bottom: 4px;
}

.datetime {
  font-size: 14px;
  color: #ecf0f1;
}

button {
  background-color: #e74c3c;
  border: none;
  padding: 4px 10px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #c0392b;
}
</style>
