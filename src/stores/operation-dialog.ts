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
    openDialog(table: AppTable, operation: Operation): void {
      this.operation = operation
      this.table = table
      this.title = `${this.operation} ${TableHelper.getLabelSingular(table)}`
      this.isActive = true
    },
  },
})

export default useOperationDialogStore
