<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { QInput } from 'quasar'
import { isShortText } from '@/utils/validators'
import useDataItemStore from '@/stores/data-item'

const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)

// Setup
dataItemStore.temporary.name = dataItemStore.selected?.name
  ? dataItemStore.selected.name
  : 'Example Name'
dataItemStore.validate.name = true

function validateInput(): void {
  dataItemStore.validate.name = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="dataItemStore.temporary.name"
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
