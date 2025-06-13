import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { layout: false } // sem sidebar/header
  },
   {
    path: '/register',
    component: RegisterView,
    meta: { layout: false }
  },
  {
    path: '/',
    component: DashBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protege rotas autenticadas
router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  if (to.meta.requiresAuth && !loggedIn) {
    return '/login'
  }
  if (to.path === '/login' && loggedIn) {
    return '/'
  }
})

export default router
