import { Field, type AppTable, type Operation } from '@/constants/core/data-enums'
import { useLogger } from '@/use/useLogger'
import { DB } from '@/services/LocalDatabase'
import { TableHelper } from '@/services/TableHelper'
import useOperationDialogStore from '@/stores/operation-dialog'
import useReportStore from '@/stores/report'
import useDataTableStore from '@/stores/data-table'

export function useOperationDialog(): { [x: string]: any } {
  const { log } = useLogger()
  const reportStore = useReportStore()
  const operationDialogStore = useOperationDialogStore()
  const dataTableStore = useDataTableStore()

  async function onOpenOperationDialog(
    table: AppTable,
    operation: Operation,
    selectedId?: string
  ): Promise<void> {
    try {
      if (selectedId) {
        operationDialogStore.setSelectedItem(await DB.getFirstByField(table, Field.ID, selectedId))
      }
      operationDialogStore.dialog.operation = operation
      operationDialogStore.dialog.table = table
      operationDialogStore.dialog.title = `${operation} ${TableHelper.getLabelSingular(table)}`
      operationDialogStore.dialog.isActive = true
    } catch (error) {
      log.error('onOpenOperationDialog', error)
    }
  }

  async function onCloseOperationDialog(): Promise<void> {
    try {
      if (dataTableStore.selectedTab !== '') {
        // DataTable tab is in use, so update the table rows
        dataTableStore.rows = await DB.getAll(operationDialogStore.dialog.table)
      }
      reportStore.$reset()
      operationDialogStore.$reset() // Also closes the dialog
    } catch (error) {
      log.error('onCloseOperationDialog', error)
    }
  }

  return {
    onOpenOperationDialog,
    onCloseOperationDialog,
  }
}
