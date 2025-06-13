<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="form-group">
      <label for="name">Nome</label>
      <input type="text" id="name" v-model="name" required />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" :readonly="isEditing" required />
    </div>
    <div class="buttons">
      <button type="submit">{{ isEditing ? 'Atualizar' : 'Adicionar' }}</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface User {
  name: string
  email: string
}

const props = defineProps<{ initialUser?: User }>()
const emit = defineEmits<{
  (e: 'add', user: User): void
  (e: 'update', user: User): void
  (e: 'cancel'): void
}>()

const name = ref('')
const email = ref('')

const isEditing = computed(() => !!props.initialUser)

watch(
  () => props.initialUser,
  (user) => {
    if (user) {
      name.value = user.name
      email.value = user.email
    } else {
      name.value = ''
      email.value = ''
    }
  },
  { immediate: true }
)

function handleSubmit() {
  const user: User = { name: name.value, email: email.value }
  if (isEditing.value) {
    emit('update', user)
  } else {
    emit('add', user)
  }
}
</script>

<style scoped>
.user-form {
  background: #ecf0f1;
  padding: 16px;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 12px;
}
input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
}
.buttons {
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 16px;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button[type='submit'] {
  background-color: #2ecc71;
}
button[type='submit']:hover {
  background-color: #27ae60;
}
button[type='button'] {
  background-color: #95a5a6;
}
button[type='button']:hover {
  background-color: #7f8c8d;
}
</style>
