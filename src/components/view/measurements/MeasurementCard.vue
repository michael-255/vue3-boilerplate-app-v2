<script setup lang="ts">
import { QCard, QCardSection, QBtn, QInput, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { ref, type Ref } from 'vue'
import { isoToDisplayDate } from '@/utils/common'

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
const testText: Ref<string> = ref('')
</script>

<template>
  <QCard>
    <QCardSection class="q-pt-sm">
      <div class="text-h6">{{ name }}</div>
      <div>
        <QIcon :name="Icon.CALENDAR_CHECK" />
        {{ isoToDisplayDate(previousMeasurementCreatedDate) }}
      </div>
      <div>
        <QIcon :name="Icon.MEASUREMENTS" />
        {{ previousMeasurementValue }} {{ measurementType }}
      </div>

      <QInput class="q-mt-md" v-model="testText" dense outlined :placeholder="measurementType">
        <template v-slot:after>
          <QBtn color="primary" class="q-ml-sm q-px-sm" :icon="Icon.SAVE" />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>
