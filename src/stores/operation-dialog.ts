import { defineStore, type StoreDefinition } from 'pinia'
import type { DatabaseObject, ReportChart, ChartDataset } from '@/constants/types-interfaces'
import type { LocalDatabase } from '@/services/LocalDatabase'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'
import { TableHelper } from '@/services/TableHelper'
import useDataTableStore from './data-table'

/**
 * Manages state for the fullscreen operation dialog components.
 */
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
    reportCharts: [] as ReportChart[],
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

      if (dataTableStore.selectedTab !== '') {
        // DataTable tab is in use, so update the table rows
        dataTableStore.rows = await database.getAll(this.table as AppTable)
      }

      this.$reset() // Also closes the dialog
    },

    /**
     * Pushes a report with all of the needed fields onto the state reportCharts array.
     * @param title
     * @param firstRecordDate
     * @param lastRecordDate
     * @param chartLabels
     * @param chartDatasets
     */
    addReportChart(
      title: string = '',
      firstRecordDate: string = '-',
      lastRecordDate: string = '-',
      chartLabels: string[] = [],
      chartDatasets: ChartDataset[] = []
    ): void {
      this.reportCharts.push({
        options: {
          responsive: true,
          radius: 3,
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: true,
            },
          },
        },
        chartData: {
          labels: chartLabels,
          datasets: chartDatasets,
        },
        firstRecordDate,
        lastRecordDate,
      })
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
