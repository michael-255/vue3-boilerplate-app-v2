import { createRouter, createWebHistory } from 'vue-router'
import { Icon, RouteName } from '@/constants/ui-enums'
import type { DataTab } from '@/constants/types-interfaces'
import { AppTable } from '@/constants/data-enums'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.DASHBOARD,
      meta: { layout: 'MenuLayout' },
      component: () => import(`../views/DashboardView.vue`),
    },
    {
      path: '/settings',
      name: RouteName.SETTINGS,
      meta: { layout: 'MenuLayout' },
      component: () => import(`../views/SettingsView.vue`),
    },
    {
      path: '/about',
      name: RouteName.ABOUT,
      meta: { layout: 'MenuLayout' },
      component: () => import(`../views/AboutView.vue`),
    },
    {
      path: '/measurements',
      name: RouteName.MEASUREMENTS,
      meta: { layout: 'MenuLayout' },
      component: () => import(`../views/MeasurementsView.vue`),
    },
    {
      path: '/measurements-data',
      name: RouteName.MEASUREMENTS_DATA,
      meta: {
        layout: 'MenuLayout',
        tabs: [
          {
            name: 'Measurements',
            icon: Icon.ACTIVITIES,
            table: AppTable.MEASUREMENTS,
          },
          {
            name: 'Measurement Records',
            icon: Icon.RECORDS,
            table: AppTable.MEASUREMENT_RECORDS,
          },
        ] as DataTab[],
      },
      component: () => import(`../components/data-tables/DataTabs.vue`),
    },
    {
      path: '/logs-and-settings-data',
      name: RouteName.LOGS_AND_SETTINGS_DATA,
      meta: {
        layout: 'MenuLayout',
        tabs: [
          {
            name: 'Logs',
            icon: Icon.LOGS,
            table: AppTable.LOGS,
          },
          {
            name: 'Settings',
            icon: Icon.SETTINGS,
            table: AppTable.SETTINGS,
          },
        ] as DataTab[],
      },
      component: () => import(`../components/data-tables/DataTabs.vue`),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: RouteName.NOT_FOUND,
      meta: { layout: 'MenuLayout' },
      component: () => import(`../views/NotFoundView.vue`),
    },
  ],
})

export default router
