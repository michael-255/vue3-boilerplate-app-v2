import { Field } from '@/constants/core/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * PageTable in temporary progress item used for creates and updates.
 */
const useTemporaryItemStore: StoreDefinition = defineStore({
  id: 'temporary-item',

  state: () => ({
    item: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
  }),
})

export default useTemporaryItemStore
