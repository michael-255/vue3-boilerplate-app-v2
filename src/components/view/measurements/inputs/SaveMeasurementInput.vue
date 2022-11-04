<script setup lang="ts">
import { QBtn, QInput } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { ref, type Ref } from 'vue'
import { isNonNegitiveNumber } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import { uuid } from '@/utils/common'
import useDataItemStore from '@/stores/data-item'
import useTakeMeasurementsStore from '@/stores/take-measurements'

const props = defineProps<{
  parentId: string
  measurementType: string
}>()

const takeMeasurementsStore = useTakeMeasurementsStore()
const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)
const inputNumber: Ref<number | null> = ref(null)

async function onSave(): Promise<void> {
  if (validateInput()) {
    // Temporary Measurement Record
    dataItemStore.temporary.id = uuid()
    dataItemStore.temporary.createdDate = new Date().toISOString()
    dataItemStore.temporary.parentId = props.parentId
    dataItemStore.temporary.measurementValue = Number(inputNumber.value)

    await DB.callCreate(AppTable.MEASUREMENT_RECORDS, {
      id: dataItemStore.temporary.id,
      createdDate: dataItemStore.temporary.createdDate,
      parentId: dataItemStore.temporary.parentId,
      measurementValue: dataItemStore.temporary.measurementValue,
    })

    inputNumber.value = null // Clear input
    takeMeasurementsStore.measurementCards = await DB.getMeasurementCards() // Reload cards
  }
}

function validateInput(): boolean {
  return !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    type="number"
    ref="inputRef"
    class="q-mt-md"
    :rules="[(val: number) => isNonNegitiveNumber(Number(val)) || 'Non-negative number required']"
    v-model="inputNumber"
    dense
    outlined
    :placeholder="measurementType"
    @blur="validateInput()"
  >
    <template v-slot:after>
      <QBtn
        :disable="!inputNumber"
        color="positive"
        class="q-ml-sm q-px-sm"
        :icon="Icon.SAVE"
        @click="onSave()"
      />
    </template>
  </QInput>
</template>
