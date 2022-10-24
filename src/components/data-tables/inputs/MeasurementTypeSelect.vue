<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { QSelect } from 'quasar'
import { MeasurementType } from '@/constants/core/data-enums'
import { Field } from '@/constants/core/data-enums'
import { isDefined } from '@/utils/validators'
// import useTemporaryItemStore from '@/stores/temporary-item'
// import useSelectedItemStore from '@/stores/selected-item'
// import useValidateItemStore from '@/stores/validate-item'
import useDataItemStore from '@/stores/data-item'

// const validate = useValidateItemStore()
// const selected = useSelectedItemStore()
// const temporary = useTemporaryItemStore()
const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  options.value = Object.values(MeasurementType)
})

function validateInput(): void {
  dataItemStore.validate.parentId = !!inputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="dataItemStore.temporary[Field.MEASUREMENT_TYPE]"
    ref="inputRef"
    label="Type"
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
