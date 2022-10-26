<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import type { AppTable } from '@/constants/core/data-enums'
import { DB } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { isDefined } from '@/utils/validators'
import { useLogger } from '@/use/useLogger'
import { TableHelper } from '@/services/TableHelper'
import useDataItemStore from '@/stores/data-item'

/**
 * Uses the table prop to get access to get the parent table.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const { log } = useLogger()
const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

/**
 * Sets the select box options with the parent items from the database.
 */
onMounted(async () => {
  const parentTable = TableHelper.getParentTable(props.table)

  // Parent table must exist to continue
  if (parentTable) {
    const parentTableData = await DB.getAll(parentTable)

    // Sorts items that will become options
    const alphaSortedData = parentTableData.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    })

    // Builds options with value and label
    options.value = alphaSortedData.map((a: any) => ({
      value: a.id, // Item id is used as the value under the hood
      label: `${a.name} (${truncateString(a.id, 4, '*')})`, // Truncate id for readability
    }))

    // Set the current option
    // must do this first so it can be null if parent was deleted versus being the first option
    if (dataItemStore.selected?.parentId) {
      const parent = options.value?.find(
        (opt) => opt.value === dataItemStore.selected.parentId
      )?.value

      if (parent) {
        dataItemStore.temporary.parentId = parent
        dataItemStore.validate.parentId = true
      } else {
        dataItemStore.temporary.parentId = null
        dataItemStore.validate.parentId = false
      }
    } else if (options.value?.length > 0) {
      dataItemStore.temporary.parentId = options.value[0].value
      dataItemStore.validate.parentId = true
    } else {
      dataItemStore.temporary.parentId = null
      dataItemStore.validate.parentId = false
    }
  } else {
    log.error('No parent table to make selection', { name: 'ParentIdSelect:onMounted' })
  }
})

function validateInput(): void {
  dataItemStore.validate.parentId = !!inputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="dataItemStore.temporary.parentId"
    ref="inputRef"
    label="Parent"
    :options="options"
    :rules="[(val: string) => isDefined(val) || '* Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
