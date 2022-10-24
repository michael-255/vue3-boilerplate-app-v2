import { Field } from '@/constants/core/data-enums'
import type { DatabaseObject } from '@/constants/types-interfaces'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Companion store to DataTable for tracking changes to the current item.
 */
const useDataItemStore: StoreDefinition = defineStore({
  id: 'data-item',

  state: () => ({
    selected: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
    temporary: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
    validate: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
  }),

  actions: {
    setSelectedItem(item: DatabaseObject): void {
      this.selected = Object.assign({}, this.selected, item)
    },
  },

  getters: {
    areItemFieldsValid:
      (state: any) =>
      (fields: Field[]): boolean => {
        return fields.every((field: Field) => state.validate[field] === true)
      },
  },
})

export default useDataItemStore
