<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { QInput } from 'quasar'
import { isShortText } from '@/utils/validators'
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
