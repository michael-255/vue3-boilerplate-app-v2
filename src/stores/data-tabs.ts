import type { DataTab } from '@/constants/types-interfaces'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Tracks state for the DataTabs components.
 */
const useDataTabsStore: StoreDefinition = defineStore({
  id: 'data-tabs',

  state: () => ({
    tabs: [] as DataTab[],
  }),
})

export default useDataTabsStore
