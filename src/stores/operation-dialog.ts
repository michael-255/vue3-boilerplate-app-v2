import { defineStore, type StoreDefinition } from 'pinia'
import type { DatabaseObject } from '@/constants/types-interfaces'
import type { LocalDatabase } from '@/services/LocalDatabase'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'
import { TableHelper } from '@/services/TableHelper'
import useDataTableStore from './data-table'
import useReportStore from './report'

const useOperationDialogStore: StoreDefinition = defineStore({
  id: 'operation-dialog',

  state: () => ({
    isActive: false,
    table: '',
    operation: Operation.NOOP,
    title: '',
    selectedItem: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
    temporaryItem: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
    validateItem: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
  }),

  actions: {
    openDialog(table: AppTable, operation: Operation, selectedItem?: DatabaseObject) {
      if (selectedItem) {
        this.selectedItem = Object.assign({}, this.selectedItem, selectedItem)
      }
      this.operation = operation
      this.table = table
      this.title = `${operation} ${TableHelper.getLabelSingular(table)}`
      this.isActive = true
    },

    async closeDialog(database: LocalDatabase): Promise<void> {
      const dataTableStore = useDataTableStore()
      const reportStore = useReportStore()

      if (dataTableStore.selectedTab !== '') {
        // DataTable tab is in use, so update the table rows
        dataTableStore.rows = await database.getAll(this.table as AppTable)
      }

      reportStore.$reset()
      this.$reset() // Also closes the dialog
    },
  },

  getters: {
    areItemFieldsValid:
      (state: any) =>
      (fields: Field[]): boolean => {
        return fields.every((field: Field) => state.validateItem[field] === true)
      },
  },
})

export default useOperationDialogStore
