<script setup lang="ts">
import type { DatabaseObject } from '@/constants/types-interfaces'
import { QBadge, QCard, QCardSection, QBtn, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { isoToDisplayDate } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import { onUpdated, ref } from 'vue'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'
import { useLogger } from '@/use/useLogger'
import { DB } from '@/services/LocalDatabase'
import useOperationDialogStore from '@/stores/operation-dialog'
import SaveMeasurementInput from './inputs/SaveMeasurementInput.vue'

// Props & Emits
const props = defineProps<{
  measurementCard: DatabaseObject
}>()

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()

// These ensure a live update of the time since the last record
const previousCreatedDateRef = ref(new Date(props.measurementCard?.previousCreatedDate || '')) // Ref of the date
const timeAgo = useTimeAgo(previousCreatedDateRef) // Tracks the ref

onUpdated(() => {
  previousCreatedDateRef.value = new Date(props.measurementCard?.previousCreatedDate || '')
})

async function onReportDialog(): Promise<void> {
  try {
    const selectedItem = await DB.getFirstByField(
      AppTable.MEASUREMENTS,
      Field.ID,
      props.measurementCard?.id
    )
    operationDialogStore.openDialog(AppTable.MEASUREMENTS, Operation.REPORT, selectedItem)
  } catch (error) {
    log.error('TakeMeasurementCard:onReportDialog', error)
  }
}
</script>

<template>
  <QCard>
    <QCardSection class="q-pt-sm">
      <div class="text-h6">{{ measurementCard?.name }}</div>

      <QBtn
        round
        flat
        :icon="Icon.REPORT"
        class="absolute-top-right q-ma-sm"
        @click="onReportDialog()"
      />

      <div>
        <QBadge rounded color="grey-9" :label="timeAgo || 'never'" />
      </div>

      <div>
        <QIcon :name="Icon.CALENDAR_CHECK" />
        <span class="text-caption q-ml-xs">
          {{ isoToDisplayDate(measurementCard?.previousCreatedDate) || '-' }}
        </span>
      </div>

      <div>
        <QIcon :name="Icon.MEASUREMENTS" />
        <span class="text-caption q-ml-xs">
          {{ measurementCard?.previousMeasurementValue || '-' }}
          {{ measurementCard?.measurementType }}
        </span>
      </div>

      <SaveMeasurementInput
        :parentId="measurementCard?.id"
        :measurementType="measurementCard?.measurementType"
        :name="measurementCard?.name"
      />
    </QCardSection>
  </QCard>
</template>
