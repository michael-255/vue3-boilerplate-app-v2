<script setup lang="ts">
import type { AppTable } from '@/constants/core/data-enums'
import { onMounted } from 'vue'
import { useLogger } from '@/use/useLogger'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { DB } from '@/services/LocalDatabase'
import useReportStore from '@/stores/report'
import useDataItemStore from '@/stores/data-item'

// Props & Emits
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
    const generatedReport = await DB.callReport(props.table, dataItemStore.selected.id)

    reportStore.options.plugins.title = {
      text: generatedReport?.title,
      display: true,
    }
    reportStore.chartData = {
      labels: generatedReport?.labels,
      datasets: generatedReport?.datasets,
    }
    reportStore.firstDate = generatedReport?.firstDate
    reportStore.lastDate = generatedReport?.lastDate
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
