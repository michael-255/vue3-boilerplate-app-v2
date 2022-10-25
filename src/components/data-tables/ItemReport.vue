<script setup lang="ts">
import type { AppTable } from '@/constants/core/data-enums'
import { onMounted } from 'vue'
import { useLogger } from '@/use/useLogger'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import useReportStore from '@/stores/report'
import useDataItemStore from '@/stores/data-item'

/**
 * Component for handling reports for each supported table.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const { log } = useLogger()
const dataItemStore = useDataItemStore()
const reportStore = useReportStore()
Chart.register(...registerables)

/**
 * Generating the report on mount for the table item.
 */
onMounted(async () => {
  try {
    const { generateReport } = getTableActions(props.table)
    if (generateReport) {
      await generateReport(dataItemStore.selected?.id)
    } else {
      log.error('Missing generateReport action', { name: 'PageReport:onMounted' })
    }
  } catch (error) {
    log.error('ItemReport:onMounted', error)
  }
})
</script>

<template>
  <LineChart :options="reportStore.options" :chartData="reportStore.chartData" />
  <!-- Dates below report -->
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">First Record Date</div>
    <div>{{ reportStore.firstDate || '-' }}</div>
  </div>
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">Last Record Date</div>
    <div>{{ reportStore.lastDate || '-' }}</div>
  </div>
</template>
