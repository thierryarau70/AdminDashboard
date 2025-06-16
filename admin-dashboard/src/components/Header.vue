<template>
  <header class="header">
    <h1>Painel Administrativo</h1>
    <div class="datetime">{{ dateTime }}</div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

.datetime {
  font-size: 16px;
  color: #ecf0f1;
}
</style>
