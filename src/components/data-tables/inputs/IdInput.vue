<script setup lang="ts">
import { QInput } from 'quasar'
import { ref, type Ref } from 'vue'
import { Icon } from '@/constants/ui/icon-enums'
import { isId } from '@/utils/validators'
import { uuid } from '@/utils/common'
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
dataItemStore.temporary.id = dataItemStore.selected?.id ? dataItemStore.selected.id : uuid()
dataItemStore.validate.id = true

function generateId(): void {
  dataItemStore.temporary.id = uuid()
  dataItemStore.validate.id = true
}

function validateInput(): void {
  dataItemStore.validate.id = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="dataItemStore.temporary.id"
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
