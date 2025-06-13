<template>
  <div class="config-container">
    <h2 class="title">Configurações</h2>
    <p class="subtitle">Altere as configurações do sistema.</p>

    <div class="section">
      <h3 class="section-title">Conta</h3>
      <button class="btn" @click="goToAccount">Configurações da Conta</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goToAccount() {
  router.push('/account')
}
</script>

<style scoped>
.config-container {
  padding: 24px;
  background-color: #f9f9f9;
  min-height: 100%;
}

.title {
  font-size: 28px;
  margin-bottom: 8px;
  color: #2c3e50;
}

.subtitle {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.section {
  margin-top: 20px;
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.btn {
  background-color: #1abc9c;
  border: none;
  padding: 10px 16px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  background-color: #16a085;
}
</style>
