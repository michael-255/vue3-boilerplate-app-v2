<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { QSelect } from 'quasar'
import { MeasurementType } from '@/constants/core/data-enums'
import { Field } from '@/constants/core/data-enums'
import { isDefined } from '@/utils/validators'
import useDataItemStore from '@/stores/data-item'

const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  options.value = Object.values(MeasurementType)
  dataItemStore.temporary[Field.MEASUREMENT_TYPE] = options.value[0]
  dataItemStore.validate[Field.MEASUREMENT_TYPE] = true
})

function validateInput(): void {
  dataItemStore.validate[Field.MEASUREMENT_TYPE] = !!inputRef?.value?.validate()
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
