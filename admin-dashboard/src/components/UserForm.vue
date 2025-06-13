<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Nome</label>
      <input v-model="form.name" required placeholder="Digite seu nome" />
    </div>

    <div class="form-group">
      <label >Email</label>
      <input v-model="form.email" type="email" required :readonly="isEditing" placeholder="Digite seu Email" />
    </div>

    <div class="form-group">
      <label>Senha</label>
      <input
        v-model="form.password"
        type="password"
        required
        placeholder="Digite a senha"
      />
    </div>
    <div class="buttons">
    <button type="submit">{{ isEditing ? 'Salvar' : 'Adicionar' }}</button>
    <button type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
    <div class="">
 <select v-model="form.role">
  <option value="user">Usuário Padrão</option>
  <option value="admin">Administrador</option>
</select>

    </div>
   
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'

interface User {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}


const props = defineProps<{
  initialUser?: User
}>()

const emit = defineEmits<{
  (e: 'add', user: User): void
  (e: 'update', user: User): void
  (e: 'cancel'): void
}>()

const form = reactive<User>({
  name: '',
  email: '',
  password: '',
  role: 'user'
})

watch(
  () => props.initialUser,
  (user) => {
    if (user) {
      form.name = user.name
      form.email = user.email
      form.password = user.password ?? ''
    } else {
      form.name = ''
      form.email = ''
      form.password = ''
    }
  },
  { immediate: true }
)

const isEditing = computed(() => !!props.initialUser)

function handleSubmit() {
  if (isEditing.value) {
    emit('update', { ...form })
  } else {
    emit('add', { ...form })
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
  background-color: #1abc9c;
}
button[type='submit']:hover {
  background-color: #16a085;
}
button[type='button'] {
  background-color: #8f8d8d;
}
button[type='button']:hover {
  background-color: #7c7878;
}
</style>
