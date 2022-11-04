<script setup lang="ts">
import { QBadge, QCard, QCardSection, QBtn, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { isoToDisplayDate } from '@/utils/common'
import { useLogger } from '@/use/useLogger'
import { useTimeAgo } from '@vueuse/core'
import { onUpdated, ref } from 'vue'
import SaveMeasurementInput from './inputs/SaveMeasurementInput.vue'

const props = defineProps<{
  parentId: string
  name: string
  measurementType: string
  previousCreatedDate: string | undefined
  previousValue: number | undefined
}>()

const { log } = useLogger()
// These ensure a live update of the time since the last one
const previousCreatedDateRef = ref(new Date(props.previousCreatedDate || '')) // Ref of the date
const timeAgo = useTimeAgo(previousCreatedDateRef) // Tracks the ref

onUpdated(() => {
  previousCreatedDateRef.value = new Date(props.previousCreatedDate || '')
})
</script>

<template>
  <QCard>
    <QCardSection class="q-pt-sm">
      <div class="text-h6">{{ name }}</div>

      <QBtn round flat :icon="Icon.REPORT" class="absolute-top-right q-ma-sm" />

      <div>
        <QBadge rounded color="grey-9" :label="timeAgo || 'never'" />
      </div>

      <div>
        <QIcon :name="Icon.CALENDAR_CHECK" />
        <span class="text-caption q-ml-xs">
          {{ isoToDisplayDate(previousCreatedDate || '') }}
        </span>
      </div>

      <div>
        <QIcon :name="Icon.MEASUREMENTS" />
        <span class="text-caption q-ml-xs"> {{ previousValue || '-' }} {{ measurementType }} </span>
      </div>

      <SaveMeasurementInput :parentId="parentId" :measurementType="measurementType" />
    </QCardSection>
  </QCard>
</template>
