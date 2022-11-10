<script setup lang="ts">
import { QBtn, QInput } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { ref, type Ref } from 'vue'
import { isPositiveNumber } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import { uuid } from '@/utils/common'
import { useLogger } from '@/use/useLogger'
import { useOperationDialog } from '@/use/useOperationDialog'
import useTakeMeasurementsStore from '@/stores/take-measurements'
import useOperationDialogStore from '@/stores/operation-dialog'

const props = defineProps<{
  parentId: string
  measurementType: string
  name: string
}>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const { onCloseOperationDialog } = useOperationDialog()
const takeMeasurementsStore = useTakeMeasurementsStore()
const operationDialogStore = useOperationDialogStore()
const inputRef: Ref<any> = ref(null)
const inputNumber: Ref<number | null> = ref(null)

async function onSave(): Promise<void> {
  confirmDialog(
    'Save',
    `Are you sure you want to save this measurement?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
        operationDialogStore.item.temporary.id = uuid()
        operationDialogStore.item.temporary.createdDate = new Date().toISOString()
        operationDialogStore.item.temporary.parentId = props.parentId
        operationDialogStore.item.temporary.measurementValue = Number(inputNumber.value)

        await DB.callCreate(AppTable.MEASUREMENT_RECORDS, {
          id: operationDialogStore.item.temporary.id,
          createdDate: operationDialogStore.item.temporary.createdDate,
          parentId: operationDialogStore.item.temporary.parentId,
          measurementValue: operationDialogStore.item.temporary.measurementValue,
        })

        log.info(`Saved ${props.name} (${Number(inputNumber.value)} ${props.measurementType})`, {
          name: 'SaveMeasurement:Info',
        })

        takeMeasurementsStore.measurementCards = await DB.getMeasurementCards() // Reload cards
        onCloseOperationDialog()
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
    :rules="[(val: number) => isPositiveNumber(Number(val)) || 'Positive number required']"
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
