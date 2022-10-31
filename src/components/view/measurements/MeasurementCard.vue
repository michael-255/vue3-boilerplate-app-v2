<script setup lang="ts">
import { QBadge, QCard, QCardSection, QBtn, QInput, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { ref, type Ref } from 'vue'
import { isoToDisplayDate } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import { isNonNegitiveNumber } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import { MeasurementRecord } from '@/models/MeasurementRecord'

/**
 * Component allows you to view and perform operations on table data.
 * @param table
 */
const props = defineProps<{
  name: string
  measurementType: string
  previousMeasurementCreatedDate: string
  previousMeasurementValue: number
}>()

const inputRef: Ref<any> = ref(null)
const inputNumber: Ref<number | null> = ref(null)

const timeSince = useTimeAgo(new Date(props.previousMeasurementCreatedDate))

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
  <QCard>
    <QCardSection class="q-pt-sm">
      <div class="text-h6">{{ name }}</div>

      <QBtn round flat :icon="Icon.REPORT" class="absolute-top-right q-ma-sm" />

      <div>
        <QBadge rounded color="grey-9" :label="timeSince || 'never'" />
      </div>

      <div>
        <QIcon :name="Icon.CALENDAR_CHECK" />
        <span class="text-caption q-ml-xs">
          {{ isoToDisplayDate(previousMeasurementCreatedDate) }}
        </span>
      </div>

      <div>
        <QIcon :name="Icon.MEASUREMENTS" />
        <span class="text-caption q-ml-xs">
          {{ previousMeasurementValue || '-' }} {{ measurementType }}
        </span>
      </div>

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
    </QCardSection>
  </QCard>
</template>
