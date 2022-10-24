import { Field } from '@/constants/data-enums'
import type { DatabaseObject } from '@/constants/types-interfaces'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * PageTable currently selected item.
 */
const useSelectedItemStore: StoreDefinition = defineStore({
  id: 'selected-item',

  state: () => ({
    item: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
  }),

  actions: {
    setItem(item: DatabaseObject): void {
      this.item = Object.assign({}, this.item, item)
    },
  },
})

export default useSelectedItemStore
