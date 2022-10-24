import type { DataTab } from '@/constants/types-interfaces'
import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { AppTable } from '@/constants/core/data-enums'
import useDataTableStore from '@/stores/data-table'

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
            icon: Icon.MEASUREMENTS,
            table: AppTable.MEASUREMENTS,
          },
          {
            name: 'Records',
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

router.afterEach(async (to: any) => {
  // Manages tabs for DataTabs and DataTable
  const dataTable = useDataTableStore()
  const tabs = (to?.meta?.tabs || []) as DataTab[]

  if (tabs.length > 0) {
    dataTable.selectedTab = tabs[0].name
    dataTable.tabs = tabs
  } else {
    dataTable.$reset()
  }
})

export default router
