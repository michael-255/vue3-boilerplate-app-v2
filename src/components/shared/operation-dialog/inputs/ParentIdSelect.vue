<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { isDefined } from '@/utils/validators'
import { TableHelper } from '@/services/TableHelper'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

/**
 * Sets the select box options with the parent items from the database.
 */
onMounted(async () => {
  try {
    const parentTable = TableHelper.getParentTable(operationDialogStore.table)

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
      if (operationDialogStore.selectedItem?.parentId) {
        const parent = options.value?.find(
          (opt) => opt.value === operationDialogStore.selectedItem.parentId
        )?.value

        if (parent) {
          operationDialogStore.temporaryItem.parentId = parent
          operationDialogStore.validateItem.parentId = true
        } else {
          operationDialogStore.temporaryItem.parentId = null
          operationDialogStore.validateItem.parentId = false
        }
      } else if (options.value?.length > 0) {
        operationDialogStore.temporaryItem.parentId = options.value[0].value
        operationDialogStore.validateItem.parentId = true
      } else {
        operationDialogStore.temporaryItem.parentId = null
        operationDialogStore.validateItem.parentId = false
      }
    } else {
      log.error('No parent table to make selection', { name: 'ParentIdSelect:MissingParentTable' })
    }
  } catch (error) {
    log.error('ParentIdSelect:onMounted', error)
  }
})

function validateInput(): void {
  operationDialogStore.validateItem.parentId = !!inputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="operationDialogStore.temporaryItem.parentId"
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
