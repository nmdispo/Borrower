import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RenteeDashboardView from '@/views/RenteeLoginView.vue'
import RenterDashboardView from '@/views/RenterLoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/renteelogin',
      name: 'renteelogin',
      component: RenteeDashboardView,
    },
    {
      path: '/renterlogin',
      name: 'renterlogin',
      component: RenterDashboardView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
  ],
})

export default router
