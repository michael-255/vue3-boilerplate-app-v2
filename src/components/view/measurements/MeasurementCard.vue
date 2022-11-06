<script setup lang="ts">
import { QBadge, QCard, QCardSection, QBtn, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { isoToDisplayDate } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import { onUpdated, ref } from 'vue'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'
import { useLogger } from '@/use/useLogger'
import SaveMeasurementInput from './inputs/SaveMeasurementInput.vue'
import DataTableDialog from '../data-table/DataTableDialog.vue'
import ItemReport from '../data-table/ItemReport.vue'
import useDataTableStore from '@/stores/data-table'
import useReportStore from '@/stores/report'
import useDataItemStore from '@/stores/data-item'
import { DB } from '@/services/LocalDatabase'

const props = defineProps<{
  parentId: string
  name: string
  measurementType: string
  previousCreatedDate: string
  previousValue: number
}>()

const { log } = useLogger()
const dataTableStore = useDataTableStore()
const reportStore = useReportStore()
const dataItemStore = useDataItemStore()
// These ensure a live update of the time since the last record
const previousCreatedDateRef = ref(new Date(props.previousCreatedDate || '')) // Ref of the date
const timeAgo = useTimeAgo(previousCreatedDateRef) // Tracks the ref

onUpdated(() => {
  previousCreatedDateRef.value = new Date(props.previousCreatedDate || '')
})

/**
 * Closes the fullscreen dialog after reseting the stores and updating the table rows.
 */
async function closeDialog(): Promise<void> {
  try {
    dataItemStore.$reset()
    reportStore.$reset()
    dataTableStore.operation = Operation.NOOP
    dataTableStore.dialog = false // Always last so everything else is updated before dialog changes
  } catch (error) {
    log.error('DataTable:closeDialog', error)
  }
}

async function onReport(): Promise<void> {
  try {
    dataItemStore.setSelectedItem(
      await DB.getFirstByField(AppTable.MEASUREMENTS, Field.ID, props.parentId)
    )
    dataTableStore.operation = Operation.REPORT
    dataTableStore.dialog = true
  } catch (error) {
    log.error('MeasurementCard:onReport', error)
  }
}
</script>

<template>
  <QCard>
    <QCardSection class="q-pt-sm">
      <div class="text-h6">{{ name }}</div>

      <QBtn round flat :icon="Icon.REPORT" class="absolute-top-right q-ma-sm" @click="onReport()" />

      <div>
        <QBadge rounded color="grey-9" :label="timeAgo || 'never'" />
      </div>

      <div>
        <QIcon :name="Icon.CALENDAR_CHECK" />
        <span class="text-caption q-ml-xs">
          {{ isoToDisplayDate(previousCreatedDate) || '-' }}
        </span>
      </div>

      <div>
        <QIcon :name="Icon.MEASUREMENTS" />
        <span class="text-caption q-ml-xs"> {{ previousValue || '-' }} {{ measurementType }} </span>
      </div>

      <SaveMeasurementInput :parentId="parentId" :measurementType="measurementType" />
    </QCardSection>
  </QCard>

  <DataTableDialog @on-dialog-close="closeDialog()">
    <ItemReport
      v-if="dataTableStore.operation === Operation.REPORT"
      :table="AppTable.MEASUREMENTS"
    />

    <div v-else>Selected operation is not supported</div>
  </DataTableDialog>
</template>
