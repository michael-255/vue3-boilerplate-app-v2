<script setup lang="ts">
import { QInput } from 'quasar'
import { ref, type Ref } from 'vue'
import { Icon } from '@/constants/ui/icon-enums'
import { isId } from '@/utils/validators'
import { uuid } from '@/utils/common'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)

try {
  operationDialogStore.temporaryItem.id = operationDialogStore.selectedItem?.id
    ? operationDialogStore.selectedItem.id
    : uuid()
  operationDialogStore.validateItem.id = true
} catch (error) {
  log.error('IdInput:Setup', error)
}

function generateId(): void {
  operationDialogStore.temporaryItem.id = uuid()
  operationDialogStore.validateItem.id = true
}

function validateInput(): void {
  operationDialogStore.validateItem.id = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="operationDialogStore.temporaryItem.id"
    ref="inputRef"
    label="Id"
    :rules="[(val: string) => isId(val) || 'Id must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  >
    <template v-slot:after>
      <QBtn :icon="Icon.RENEW" color="primary" class="q-ml-xs q-px-sm" @click="generateId()" />
    </template>
  </QInput>
</template>
