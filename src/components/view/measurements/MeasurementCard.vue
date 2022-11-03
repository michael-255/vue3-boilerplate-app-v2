<script setup lang="ts">
import { QBadge, QCard, QCardSection, QBtn, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { isoToDisplayDate } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import SaveMeasurementInput from './inputs/SaveMeasurementInput.vue'

const props = defineProps<{
  parentId: string
  name: string
  measurementType: string
  previousMeasurementCreatedDate: string
  previousMeasurementValue: number
}>()

const timeSince = useTimeAgo(new Date(props.previousMeasurementCreatedDate))
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

      <SaveMeasurementInput :measurementType="measurementType" />
    </QCardSection>
  </QCard>
</template>
