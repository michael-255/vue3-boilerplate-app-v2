<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { QInput } from 'quasar'
import { isPositiveNumber } from '@/utils/validators'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)

try {
  operationDialogStore.temporaryItem.measurementValue = operationDialogStore.selectedItem
    ?.measurementValue
    ? operationDialogStore.selectedItem.measurementValue
    : 1
  operationDialogStore.validateItem.measurementValue = true
} catch (error) {
  log.error('MeasurementValueInput:Setup', error)
}

function validateInput(): void {
  operationDialogStore.validateItem.measurementValue = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="operationDialogStore.temporaryItem.measurementValue"
    ref="inputRef"
    label="Value"
    :rules="[(val: number) => isPositiveNumber(val) || 'Positive number required']"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
