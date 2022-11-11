<script setup lang="ts">
import { QBanner } from 'quasar'
import { onMounted } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
Chart.register(...registerables)

onMounted(async () => {
  try {
    const generatedReport = await DB.callReport(
      operationDialogStore.table,
      operationDialogStore.selectedItem.id
    )

    operationDialogStore.addReportChart(
      generatedReport?.title,
      generatedReport?.firstRecordDate,
      generatedReport?.lastRecordDate,
      generatedReport?.chartLabels,
      generatedReport?.chartDatasets
    )
  } catch (error) {
    log.error('OperationReport:onMounted', error)
  }
})
</script>

<template>
  <div v-for="(chart, i) in operationDialogStore.reportCharts" :key="i">
    <LineChart :options="chart.options" :chartData="chart.chartData" />
    <!-- Dates below reports -->
    <QBanner class="bg-primary">
      <div class="row justify-start">
        <div class="col-sm-6 col-xs-12">
          <div class="text-weight-bold text-white">First Record Date</div>
          <div class="text-caption text-white q-mb-sm">{{ chart.firstRecordDate }}</div>
        </div>

        <div class="col-sm-6 col-xs-12">
          <div class="text-weight-bold text-white">Last Record Date</div>
          <div class="text-caption text-white">{{ chart.lastRecordDate }}</div>
        </div>
      </div>
    </QBanner>
  </div>
</template>
