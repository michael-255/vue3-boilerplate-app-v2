<script setup lang="ts">
import { onMounted } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'
import useReportStore from '@/stores/report'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const reportStore = useReportStore()
Chart.register(...registerables)

onMounted(async () => {
  try {
    const generatedReport = await DB.callReport(
      operationDialogStore.table,
      operationDialogStore.selectedItem.id
    )

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
    log.error('OperationReport:onMounted', error)
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
