import { defineStore, type StoreDefinition } from 'pinia'
import { isoToDisplayDate } from '@/utils/common'

type ReportState = {
  options: ReportOptions
  chartData: ReportChartData
  firstDate: string
  lastDate: string
}

type ReportOptions = {
  responsive: boolean
  radius: number
  plugins: ReportPlugins
}

type ReportPlugins = { [x: string]: any }

type ReportChartData = {
  labels: any[]
  datasets: ReportDataset[]
}

type ReportDataset = {
  label: string
  borderColor: string
  data: any[]
}

type GenerateReportParams = {
  records: any[]
  parent: { [x: string]: any }
}

/**
 * All data needed for displaying a specific report should be generated and stored here.
 */
const useReportStore: StoreDefinition = defineStore({
  id: 'report',

  state: () =>
    ({
      options: {
        responsive: true,
        radius: 3,
        plugins: {
          title: {
            display: true,
            text: '',
          },
          legend: {
            display: true,
          },
        },
      },
      chartData: {
        labels: [],
        datasets: [],
      },
      firstDate: '-',
      lastDate: '-',
    } as ReportState),
})

export default useReportStore
