<template>
  <div class="users-container">
    <h2>Usuários</h2>

    <!-- Apenas administradores veem o botão de novo usuário -->
    <button v-if="isAdmin" @click="openNewUserForm">Novo Usuário</button>

    <UserForm
      v-if="showForm"
      :initialUser="editingUser"
      @add="handleAddUser"
      @update="handleUpdateUser"
      @cancel="cancelForm"
    />

    <!-- Mostra apenas a tabela filtrada -->
    <UserTable :users="filteredUsers" @delete="handleDeleteUser" @edit="openEditUserForm" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import UserForm from '../components/UserForm.vue'
import UserTable from '../components/UserTable.vue'
import { useAuth } from '../auth/useAuth'

interface User {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

const users = ref<User[]>([])
const showForm = ref(false)
const editingUser = ref<User | undefined>(undefined)

// Auth
const { isAdmin, user: currentUser } = useAuth()

// Lista de usuários visíveis
const filteredUsers = computed(() => {
  return isAdmin ? users.value : users.value.filter(u => u.email === currentUser.email)
})

function openNewUserForm() {
  editingUser.value = undefined
  showForm.value = true
}

function openEditUserForm(user: User) {
  editingUser.value = { ...user, password: '' }
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
  if (isAdmin) {
    users.value.push(newUser)
  }
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
  if (isAdmin) {
    users.value = users.value.filter((u) => u.email !== email)
  }
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
  background-color: #1abc9c;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #16a085;
}
</style>
