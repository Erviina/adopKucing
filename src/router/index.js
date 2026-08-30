import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AdoptNowView from '@/views/AdoptNowView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/adopt-now/:id',
      name: 'adopt-now',
      component: AdoptNowView
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../components/TermAndCondition.vue')
    },
    {
      path: '/adoption',
      name: 'adoption',
      component: () => import('@/views/AdoptionView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsView.vue'),
    },
    {
      path: '/report-rescue',
      name: 'report-rescue',
      component: () => import('@/views/ReportRescueView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/components/SignUp.vue'),
    },
    {
      path: '/donate',
      name: 'donate',
      component: () => import('@/views/DonateView.vue'),
    },
    {
      path: '/all-pages',
      name: 'all-pages',
      component: () => import('@/views/AllPagesView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router