<script setup lang="ts">
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import { TableHelper } from '@/services/TableHelper'
import { DB } from '@/services/LocalDatabase'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const operationDialogStore = useOperationDialogStore()

function onCreate() {
  try {
    const fields = TableHelper.getFields(operationDialogStore.table)
    if (!operationDialogStore.areItemFieldsValid(fields)) {
      validationFailedDialog()
    } else {
      confirmCreateDialog()
    }
  } catch (error) {
    log.error('OperationCreate:onCreate', error)
  }
}

function validationFailedDialog(): void {
  dismissDialog(
    'Validation Error',
    'Unable to create item. Ensure all of the inputs have valid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

function confirmCreateDialog(): void {
  confirmDialog(
    'Create',
    `Are you sure you want to create this ${TableHelper.getLabelSingular(
      operationDialogStore.table
    )}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        await DB.callCreate(operationDialogStore.table, operationDialogStore.temporaryItem)
        operationDialogStore.closeDialog(DB)
      } catch (error) {
        log.error('OperationCreate:confirmCreateDialog', error)
      }
    }
  )
}
</script>

<template>
  <div v-for="(comp, i) in TableHelper.getComponents(operationDialogStore.table)" :key="i">
    <component :is="comp" />
  </div>

  <QBtn class="q-mt-md" color="positive" :icon="Icon.SAVE" label="Create" @click="onCreate()" />
</template>
