import { defineStore, type StoreDefinition } from 'pinia'
import type { DatabaseObject } from '@/constants/types-interfaces'
import { Field, Operation } from '@/constants/core/data-enums'

const useOperationDialogStore: StoreDefinition = defineStore({
  id: 'operation-dialog',

  state: () => ({
    // Fullscreen operation dialog
    dialog: {
      isActive: false,
      table: '',
      operation: Operation.NOOP,
      title: '',
    },
    // Item being inspected or worked on in the dialog
    item: {
      selected: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
      temporary: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
      validate: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
    },
  }),

  actions: {
    setSelectedItem(item: DatabaseObject): void {
      this.item.selected = Object.assign({}, this.item.selected, item)
    },
  },

  getters: {
    areItemFieldsValid:
      (state: any) =>
      (fields: Field[]): boolean => {
        return fields.every((field: Field) => state.item.validate[field] === true)
      },
  },
})

export default useOperationDialogStore
