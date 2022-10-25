<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { QInput } from 'quasar'
import { isNonNegitiveNumber } from '@/utils/validators'
import useDataItemStore from '@/stores/data-item'

const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)

// Setup
dataItemStore.temporary.measurementValue = dataItemStore.selected?.measurementValue
  ? dataItemStore.selected.measurementValue
  : 1
dataItemStore.validate.measurementValue = true

function validateInput(): void {
  dataItemStore.validate.measurementValue = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="dataItemStore.temporary.measurementValue"
    ref="inputRef"
    label="Value"
    :rules="[(val: number) => isNonNegitiveNumber(val) || 'Non-negative number not exceeding 1,000,000,000 is required']"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
