<!-- <template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>Email:</label>
      <input v-model="email" type="email" required />
    </div>
    <div>
      <label>Senha:</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit">Entrar</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const emit = defineEmits<{
  (e: 'login', credentials: { email: string; password: string }): void
}>()

function handleLogin() {
  emit('login', { email: email.value, password: password.value })
}
</script> -->
