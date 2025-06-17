<template>
  <table v-if="isAdmin">  <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Senha</th>
        <th>permissão</th>
        <th>Ação</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.email">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <span>{{ user.password }}</span>
        </td>
         <td> {{ user.role }}</td>
        <td>
       
          <button @click="$emit('edit', user)">✏️</button>
          <button @click="$emit('delete', user.email)">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>

  <p v-else class="not-allowed">Você não tem permissão para ver esta tabela.</p>
</template>




<script setup lang="ts">
import { useAuth } from '../auth/useAuth'
const { isAdmin } = useAuth()







interface User {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'

}

defineProps<{ users: User[] }>()
defineEmits<{
  (e: 'delete', email: string): void
  (e: 'edit', user: User): void
}>()
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 8px 12px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 6px;
}

button:hover {
  color: #e74c3c;
}

.empty-message {
  text-align: center;
  color: #888;
  font-style: italic;
}

.not-allowed {
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

</style>
