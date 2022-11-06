import { AppTable, Operation } from '@/constants/core/data-enums'
import { TableHelper } from '@/services/TableHelper'
import { defineStore, type StoreDefinition } from 'pinia'

const useOperationDialogStore: StoreDefinition = defineStore({
  id: 'operation-dialog',

  state: () => ({
    isActive: false,
    table: '',
    operation: Operation.NOOP,
    title: '',
  }),

  actions: {
    openDialog(operation: Operation): void {
      this.operation = operation
      this.title = `${this.operation} ${TableHelper.getLabelSingular(this.table as AppTable)}`
      this.isActive = true
    },

    closeDialog(): void {
      this.operation = Operation.NOOP
      this.title = ''
      this.isActive = false
    },
  },
})

export default useOperationDialogStore
