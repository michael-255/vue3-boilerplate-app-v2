import type { RouteTab } from '@/constants/types-interfaces'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Tracks state for the DataTable and DataTabs components.
 */
const useDataTableStore: StoreDefinition = defineStore({
  id: 'data-table',

  state: () => ({
    selectedTab: '',
    tabs: [] as RouteTab[],
    rows: [],
    columns: [],
    columnOptions: [],
    visibleColumns: [],
  }),
})

export default useDataTableStore
