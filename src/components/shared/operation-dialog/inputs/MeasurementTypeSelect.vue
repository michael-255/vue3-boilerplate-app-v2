<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { QSelect } from 'quasar'
import { MeasurementType } from '@/constants/core/data-enums'
import { isDefined } from '@/utils/validators'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    options.value = Object.values(MeasurementType)
    operationDialogStore.temporaryItem.measurementType = operationDialogStore.selectedItem
      .measurementType
      ? operationDialogStore.selectedItem.measurementType
      : options.value[0]
    operationDialogStore.validateItem.measurementType = true
  } catch (error) {
    log.error('MeasurementTypeSelect:onMounted', error)
  }
})

function validateInput(): void {
  operationDialogStore.validateItem.measurementType = !!inputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="operationDialogStore.temporaryItem.measurementType"
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
