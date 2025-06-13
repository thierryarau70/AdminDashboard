<template>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="users.length === 0">
        <td colspan="3" class="empty-message">Nenhum usuário cadastrado.</td>
      </tr>
      <tr v-else v-for="user in users" :key="user.email">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button @click="$emit('edit', user)">✏️</button>
          <button @click="$emit('delete', user.email)">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface User {
  name: string
  email: string
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
</style>
