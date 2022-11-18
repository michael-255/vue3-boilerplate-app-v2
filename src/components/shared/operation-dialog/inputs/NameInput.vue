<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { QInput } from 'quasar'
import { isShortText } from '@/utils/validators'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)

try {
  operationDialogStore.temporaryItem.name = operationDialogStore.selectedItem?.name
    ? operationDialogStore.selectedItem.name
    : 'Example Name'
  operationDialogStore.validateItem.name = true
} catch (error) {
  log.error('NameInput:Setup', error)
}

function validateInput(): void {
  operationDialogStore.validateItem.name = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="operationDialogStore.temporaryItem.name"
    ref="inputRef"
    label="Name"
    :rules="[(val: string) => isShortText(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
