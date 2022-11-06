<script setup lang="ts">
import { QBtn, QInput } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { ref, type Ref } from 'vue'
import { isNonNegitiveNumber } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import { uuid } from '@/utils/common'
import { useLogger } from '@/use/useLogger'
import useDataItemStore from '@/stores/data-item'
import useTakeMeasurementsStore from '@/stores/take-measurements'

const props = defineProps<{
  parentId: string
  measurementType: string
}>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const takeMeasurementsStore = useTakeMeasurementsStore()
const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)
const inputNumber: Ref<number | null> = ref(null)

async function onSave(): Promise<void> {
  confirmSaveDialog()
}

function confirmSaveDialog(): void {
  confirmDialog(
    'Save',
    `Are you sure you want to save this measurement?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      try {
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

        takeMeasurementsStore.measurementCards = await DB.getMeasurementCards() // Reload cards
        log.info(`Saved measurement (${Number(inputNumber.value)} ${props.measurementType})`, {
          name: 'SaveMeasurement:Info',
        })
        // Clear old data from input and temporary store
        inputNumber.value = null
        dataItemStore.$reset()
      } catch (error) {
        log.error('SaveMeasurement:confirmSaveDialog', error)
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
    :rules="[(val: number) => isNonNegitiveNumber(Number(val)) || 'Non-negative number required']"
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
