<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { QInput } from 'quasar'
import { isNonNegitiveNumber } from '@/utils/validators'
// import useTemporaryItemStore from '@/stores/temporary-item'
// import useSelectedItemStore from '@/stores/selected-item'
// import useValidateItemStore from '@/stores/validate-item'
import useDataItemStore from '@/stores/data-item'

// const validate = useValidateItemStore()
// const selected = useSelectedItemStore()
// const temporary = useTemporaryItemStore()
const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)

// Setup
dataItemStore.temporary.number = dataItemStore.selected?.number ? dataItemStore.selected.number : 1
dataItemStore.validate.number = true

function validateInput(): void {
  dataItemStore.validate.number = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="dataItemStore.temporary.number"
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
