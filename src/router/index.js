import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RenteeLoginView from '@/views/RenteeLoginView.vue'
import RenterLoginView from '@/views/RenterLoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import RenterDashboardView from '@/views/RenterDashboardView.vue'
import RentalsView from '@/views/RentalsView.vue'
import RenteeRentalView from '@/views/auth/RenteeRentalView.vue'
import RenteeMessagesView from '@/views/auth/RenteeMessagesView.vue'
import RenteeProfileView from '@/views/auth/RenteeProfileView.vue'
import RenteeMessengerView from '@/views/auth/RenteeMessengerView.vue'

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
      path: '/renteeMessages',
      name: 'renteeMessages',
      component: RenteeMessagesView,
    },
    {
      path: '/renteeProfile',
      name: 'renteeProfile',
      component: RenteeProfileView,
    },
    {
      path: '/renteeMessenger',
      name: 'renteeMessenger',
      component: RenteeMessengerView,
    },
  ],
})

export default router
