<script setup lang="ts">
import { QBtn, QInput } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { ref, type Ref } from 'vue'
import { isPercentNumber, isPositiveNumber } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'
import { AppTable, MeasurementType } from '@/constants/core/data-enums'
import { uuid } from '@/utils/common'
import { useLogger } from '@/use/useLogger'
import useTakeMeasurementsStore from '@/stores/take-measurements'
import useOperationDialogStore from '@/stores/operation-dialog'

const props = defineProps<{
  parentId: string
  measurementType: string
  name: string
}>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const takeMeasurementsStore = useTakeMeasurementsStore()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)
const inputNumber: Ref<number | null> = ref(null)
const rules: Ref<any[]> = ref([])

try {
  if (props.measurementType === MeasurementType.PERCENT) {
    rules.value.push(
      (val: number) => isPercentNumber(Number(val)) || 'Value between 0 and 100 required'
    )
  } else {
    rules.value.push((val: number) => isPositiveNumber(Number(val)) || 'Positive number required')
  }
} catch (error) {
  log.error('SaveMeasurementInput:Setup', error)
}

async function onSave(): Promise<void> {
  confirmDialog(
    'Save',
    `Are you sure you want to save this measurement?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        operationDialogStore.temporaryItem.id = uuid()
        operationDialogStore.temporaryItem.createdDate = new Date().toISOString()
        operationDialogStore.temporaryItem.parentId = props.parentId
        operationDialogStore.temporaryItem.measurementValue = Number(inputNumber.value)

        await DB.callCreate(AppTable.MEASUREMENT_RECORDS, {
          id: operationDialogStore.temporaryItem.id,
          createdDate: operationDialogStore.temporaryItem.createdDate,
          parentId: operationDialogStore.temporaryItem.parentId,
          measurementValue: operationDialogStore.temporaryItem.measurementValue,
        })

        log.info(`Saved ${props.name} (${Number(inputNumber.value)} ${props.measurementType})`, {
          name: 'SaveMeasurement:Info',
        })

        await takeMeasurementsStore.updateMeasurementCards(DB) // Reload cards
        operationDialogStore.closeDialog(DB)
        inputNumber.value = null
      } catch (error) {
        log.error('SaveMeasurementInput:onSave', error)
      }
    }
  )
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
    :rules="rules"
    v-model="inputNumber"
    dense
    outlined
    :placeholder="measurementType"
    @blur="validateInput()"
  >
    <template v-slot:after>
      <QBtn
        :disable="!inputNumber || !validateInput()"
        color="positive"
        class="q-ml-sm q-px-sm"
        :icon="Icon.SAVE"
        @click="onSave()"
      />
    </template>
  </QInput>
</template>
