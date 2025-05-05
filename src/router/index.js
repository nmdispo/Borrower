import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RenteeLoginView from '@/views/RenteeLoginView.vue'
import RenterLoginView from '@/views/RenterLoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import RenterDashboardView from '@/views/RenterDashboardView.vue'
import RentalsView from '@/views/RentalsView.vue'
import RenteeRentalView from '@/views/auth/RenteeRentalView.vue'
import RenterProfileView from '@/views/RenterProfileView.vue'
import RenteeProfileView from '@/views/RenteeProfileView.vue'

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
      component: RenteeLoginView,
    },
    {
      path: '/renterlogin',
      name: 'renterlogin',
      component: RenterLoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/renterdashboard',
      name: 'renterdashboard',
      component: RenterDashboardView,
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: RentalsView,
    },
    {
      path: '/renteeRentals',
      name: 'renteeRentals',
      component: RenteeRentalView,
    },
    {
      path: '/renterprofile',
      name: 'renterprofile',
      component: RenterProfileView,
    },
    {
      path: '/renteeprofile',
      name: 'renteeprofile',
      component: RenteeProfileView,
    },
  ],
})

export default router
