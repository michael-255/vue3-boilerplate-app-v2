<script setup lang="ts">
import type { DatabaseObject, DataTableProps } from '@/constants/types-interfaces'
import { type Ref, ref, onMounted } from 'vue'
import { Field } from '@/constants/core/data-enums'
import { TableHelper } from '@/services/TableHelper'
import { isoToDisplayDate } from '@/utils/common'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const inspectionValues: Ref<DatabaseObject[]> = ref([])

onMounted(async () => {
  try {
    const currentTableFields = TableHelper.getFields(operationDialogStore.table)
    const currentTableColumnProps = TableHelper.getColumns(operationDialogStore.table)

    currentTableFields.forEach((field: Field) => {
      const label =
        currentTableColumnProps.find((props: DataTableProps) => props.name === field)?.label ||
        'ERROR'

      let value = operationDialogStore.selectedItem[field] || '-'

      // Add readable date after iso date
      if (field === Field.CREATED_DATE && value !== '-') {
        value += ` (${isoToDisplayDate(value)})`
      }

      inspectionValues.value.push({ label, value })
    })
  } catch (error) {
    log.error('OperationInspect:onMounted', error)
  }
})
</script>

<template>
  <div v-for="(item, i) in inspectionValues" :key="i">
    <div class="q-mb-sm">
      <div class="text-subtitle1 text-weight-bold">{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>
