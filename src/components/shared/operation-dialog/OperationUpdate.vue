<script setup lang="ts">
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { TableHelper } from '@/services/TableHelper'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const operationDialogStore = useOperationDialogStore()

function onUpdate() {
  try {
    const fields = TableHelper.getFields(operationDialogStore.table)
    if (!operationDialogStore.areItemFieldsValid(fields)) {
      validationFailedDialog()
    } else {
      confirmUpdateDialog()
    }
  } catch (error) {
    log.error('OperationUpdate:onUpdate', error)
  }
}

function validationFailedDialog(): void {
  dismissDialog(
    'Validation Error',
    'Unable to update item. Ensure all of the inputs have valid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

async function confirmUpdateDialog(): Promise<void> {
  confirmDialog(
    'Update',
    `Are you sure you want to update this ${TableHelper.getLabelSingular(
      operationDialogStore.table
    )}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        await DB.callUpdate(
          operationDialogStore.table,
          operationDialogStore.selectedItem.id,
          JSON.parse(JSON.stringify(operationDialogStore.temporaryItem))
        )
        operationDialogStore.closeDialog(DB)
      } catch (error) {
        log.error('OperationUpdate:confirmUpdateDialog', error)
      }
    }
  )
}
</script>

<template>
  <div v-for="(comp, i) in TableHelper.getComponents(operationDialogStore.table)" :key="i">
    <component :is="comp" />
  </div>

  <QBtn color="positive" :icon="Icon.SAVE" label="Update" @click="onUpdate()" />
</template>
