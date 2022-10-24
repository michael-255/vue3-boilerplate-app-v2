<script setup lang="ts">
import type { DatabaseObject, DataTableProps } from '@/constants/types-interfaces'
import { type Ref, ref, onMounted } from 'vue'
import type { AppTable, Field } from '@/constants/core/data-enums'
import { useLogger } from '@/use/useLogger'
import { TableHelper } from '@/services/TableHelper'
// import useSelectedItemStore from '@/stores/selected-item'
import useDataItemStore from '@/stores/data-item'

/**
 * Component allows you to view the values in each of its internal (Exact) fields.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const { log } = useLogger()
// const selected = useSelectedItemStore()
const dataItemStore = useDataItemStore()
const inspectionValues: Ref<DatabaseObject[]> = ref([])

onMounted(async () => {
  try {
    const currentTableFields = TableHelper.getFields(props.table)
    const currentTableColumnProps = TableHelper.getColumns(props.table)

    currentTableFields.forEach((field: Field) => {
      inspectionValues.value.push({
        label:
          currentTableColumnProps.find((props: DataTableProps) => props.name === field)?.label ||
          'ERROR',
        value: dataItemStore.selected[field] || '-',
      })
    })
  } catch (error) {
    log.error('ItemInspect:Setup', error)
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
