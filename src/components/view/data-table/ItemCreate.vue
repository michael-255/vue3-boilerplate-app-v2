<script setup lang="ts">
import type { AppTable } from '@/constants/core/data-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import { TableHelper } from '@/services/TableHelper'
import { DB } from '@/services/LocalDatabase'
import useDataItemStore from '@/stores/data-item'

const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-create-confirmed'): void }>()
const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const dataItemStore = useDataItemStore()

function onCreate() {
  try {
    const fields = TableHelper.getFields(props.table)
    if (!dataItemStore.areItemFieldsValid(fields)) {
      validationFailedDialog()
    } else {
      confirmCreateDialog()
    }
  } catch (error) {
    log.error('ItemCreate:onCreate', error)
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
    `Are you sure you want to create this ${TableHelper.getLabelSingular(props.table)}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        await DB.callCreate(props.table, dataItemStore.temporary)
        emits('on-create-confirmed')
      } catch (error) {
        log.error('ItemCreate:confirmCreateDialog', error)
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
    :label="`Create ${TableHelper.getLabelSingular(props.table)}`"
    @click="onCreate()"
  />
</template>
