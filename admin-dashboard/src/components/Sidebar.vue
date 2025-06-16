<template>
  <div class="sidebar">
    <router-link to="/" class="btn-link">Dashboard</router-link>
    <router-link to="/users" class="btn-link">Usuários</router-link>
    <router-link to="/settings" class="btn-link">Configurações</router-link>
    <router-link to="/products" class="btn-link">Produtos</router-link>

    <div class="spacer"></div>

    <!-- <button class="btn-logout" @click="logout">Sair</button> -->
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'

// const router = useRouter()

// function logout() {
//   localStorage.removeItem('loggedIn')
//   router.push('/login')
// }
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #2c3e50;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-link {
  display: block;
  padding: 10px 16px;
  background-color: #34495e;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  transition: background 0.2s;
}

.btn-link:hover {
  background-color: #3c5a72;
}

.router-link-exact-active {
  background-color: #1abc9c;
}

.spacer {
  flex-grow: 1;
}

.btn-logout {
  padding: 10px 16px;
  margin: 40px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.btn-logout:hover {
  background-color: #c0392b;
}
</style>
