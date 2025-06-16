import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountSettings from '../views/AccountSettings.vue'
import ProductsView from '../views/ProductsView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { layout: false }
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
    path: '/account',
    component: AccountSettings,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
  path: '/products',
  component: ProductsView,
  meta: { requiresAuth: true }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'

  if (to.meta.requiresAuth && !loggedIn) {
    return '/login'
  }

  if ((to.path === '/login' || to.path === '/register') && loggedIn) {
    return '/'
  }

  return true
})

export default router
