<script setup lang="ts">
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { TableHelper } from '@/services/TableHelper'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { useOperationDialog } from '@/use/useOperationDialog'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const { onCloseOperationDialog } = useOperationDialog()
const operationDialogStore = useOperationDialogStore()

function onUpdate() {
  try {
    const fields = TableHelper.getFields(operationDialogStore.dialog.table)
    if (!operationDialogStore.areItemFieldsValid(fields)) {
      validationFailedDialog()
    } else {
      confirmUpdateDialog()
    }
  } catch (error) {
    log.error('ItemUpdate:onUpdate', error)
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
      operationDialogStore.dialog.table
    )}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        await DB.callUpdate(
          operationDialogStore.dialog.table,
          operationDialogStore.item.selected.id,
          JSON.parse(JSON.stringify(operationDialogStore.item.temporary))
        )
        onCloseOperationDialog()
      } catch (error) {
        log.error('ItemUpdate:confirmUpdateDialog', error)
      }
    }
  )
}
</script>

<template>
  <div v-for="(comp, i) in TableHelper.getComponents(operationDialogStore.dialog.table)" :key="i">
    <component :is="comp" />
  </div>

  <QBtn color="positive" :icon="Icon.SAVE" label="Update" @click="onUpdate()" />
</template>
