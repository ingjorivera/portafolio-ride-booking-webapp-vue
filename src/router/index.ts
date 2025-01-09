import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/rides/new',
        component: () => import('@/pages/NewRide.vue'),
      },
      {
        path: '/rides/new/quote',
        component: () => import('@/pages/NewRideQuote.vue'),
      },
      {
        path: '/rides/new/quote',
        component: () => import('@/pages/NewRideQuote.vue'),
      },
      {
        path: '/rides/new/quote_hourly',
        component: () => import('@/pages/NewRideQuoteHourly.vue'),
      },
      {
        path: '/account/management',
        component: () => import('@/components/account/customerManagement.vue'),
      },
      {
        path: '/account/users',
        component: () => import('@/components/account/usersProfile.vue'),
      },
      {
        path: '/account/ride-alerts',
        component: () =>
          import('@/components/account/customizeServiceAlerts.vue'),
      },
      {
        path: '',
        name: 'default',
        component: () => import('@/pages/NewRide.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
