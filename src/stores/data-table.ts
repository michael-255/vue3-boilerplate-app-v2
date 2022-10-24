import type { DataTab } from '@/constants/types-interfaces'
import { Operation } from '@/constants/core/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Tracks state for the DataTable components.
 */
const useDataTableStore: StoreDefinition = defineStore({
  id: 'data-table',

  state: () => ({
    selectedTab: 0, // First tab is always default
    tabs: [] as DataTab[],
    dialog: false,
    operation: Operation.NOOP,
    itemLabel: '',
    rows: [],
    columns: [],
    columnOptions: [],
    visibleColumns: [],
  }),
})

export default useDataTableStore
