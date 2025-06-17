import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// ✅ Criar admin default se não existir
const defaultAdmin = {
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin123',
  role: 'admin',
  balance: 0
}

const users = JSON.parse(localStorage.getItem('users') || '[]')

const exists = users.some((user: any) => user.email === defaultAdmin.email)

if (!exists) {
  users.push(defaultAdmin)
  localStorage.setItem('users', JSON.stringify(users))
}

const app = createApp(App)

app.use(router)

app.mount('#app')
