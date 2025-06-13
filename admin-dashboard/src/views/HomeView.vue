<template>
  <div>
    <h1>Bem-vindo ao sistema!</h1>
    <button @click="logout">Sair</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('loggedIn')
  router.push('/login')
}
</script>
