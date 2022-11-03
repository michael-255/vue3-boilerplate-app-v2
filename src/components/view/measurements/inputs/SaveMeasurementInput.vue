<script setup lang="ts">
import { QBtn, QInput } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { ref, type Ref } from 'vue'
import { isNonNegitiveNumber } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import { MeasurementRecord } from '@/models/MeasurementRecord'

defineProps<{
  measurementType: string
}>()

const inputRef: Ref<any> = ref(null)
const inputNumber: Ref<number | null> = ref(null)

async function onSave(): Promise<void> {
  if (validateInput()) {
    // DB.add(AppTable.MEASUREMENT_RECORDS, new MeasurementRecord({}))
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
