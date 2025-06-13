<template>
  <div class="users-container">
    <h2>Usuários</h2>
    <button @click="openNewUserForm">Novo Usuário</button>

    <UserForm
      v-if="showForm"
      :initialUser="editingUser"
      @add="handleAddUser"
      @update="handleUpdateUser"
      @cancel="cancelForm"
    />

    <UserTable :users="users" @delete="handleDeleteUser" @edit="openEditUserForm" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import UserForm from '../components/UserForm.vue'
import UserTable from '../components/UserTable.vue'

interface User {
  name: string
  email: string
}

const users = ref<User[]>([])
const showForm = ref(false)
const editingUser = ref<User | undefined>(undefined)

// E ajuste os métodos:
function openNewUserForm() {
  editingUser.value = undefined
  showForm.value = true
}

function openEditUserForm(user: User) {
  editingUser.value = { ...user }
  showForm.value = true
}

onMounted(() => {
  const storedUsers = localStorage.getItem('users')
  if (storedUsers) {
    users.value = JSON.parse(storedUsers)
  }
})

watch(users, (newUsers) => {
  localStorage.setItem('users', JSON.stringify(newUsers))
}, { deep: true })

function handleAddUser(newUser: User) {
  users.value.push(newUser)
  showForm.value = false
}

function handleUpdateUser(updatedUser: User) {
  const index = users.value.findIndex((u) => u.email === updatedUser.email)
  if (index !== -1) {
    users.value[index] = updatedUser
  }
  showForm.value = false
}

function handleDeleteUser(email: string) {
  users.value = users.value.filter((u) => u.email !== email)
}

function cancelForm() {
  showForm.value = false
}
</script>

<style scoped>
.users-container {
  padding: 20px;
}
button {
  margin-bottom: 12px;
  padding: 10px 16px;
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
</style>
