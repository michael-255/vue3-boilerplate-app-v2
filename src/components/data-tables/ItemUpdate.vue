<script setup lang="ts">
import type { AppTable } from '@/constants/core/data-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import { TableHelper } from '@/services/TableHelper'
import { DB } from '@/services/LocalDatabase'
import useDataItemStore from '@/stores/data-item'

/**
 * Component for displaying inputs for the updating an existing data item.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-update-confirmed'): void }>()
const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const dataItemStore = useDataItemStore()

function onUpdate() {
  try {
    const fields = TableHelper.getFields(props.table)
    if (!dataItemStore.areItemFieldsValid(fields)) {
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
    `Are you sure you want to update this ${TableHelper.getLabelSingular(props.table)}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        await DB.callUpdate(
          props.table,
          dataItemStore.selected.id,
          JSON.parse(JSON.stringify(dataItemStore.temporary))
        )
        emits('on-update-confirmed')
      } catch (error) {
        log.error('ItemUpdate:confirmUpdateDialog', error)
      }
    }
  )
}
</script>

<template>
  <div v-for="(comp, i) in TableHelper.getComponents(table)" :key="i">
    <component :is="comp" :table="table" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Update ${TableHelper.getLabelSingular(props.table)}`"
    @click="onUpdate()"
  />
</template>
