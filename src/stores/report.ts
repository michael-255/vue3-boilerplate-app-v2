import { defineStore, type StoreDefinition } from 'pinia'
import { isoToDisplayDate } from '@/utils/luxon'

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

  actions: {
    generateExerciseReport(params: GenerateReportParams) {
      const totalReps = params.records.map((r) => {
        if (r?.reps) {
          return r.reps.reduce((total: number, current: number) => {
            if (current) {
              return total + current
            }
          }, 0)
        } else {
          return 0
        }
      })

      const totalWeight = params.records.map((r) => {
        if (r?.weight) {
          return r.weight.reduce((total: number, current: number) => {
            if (current) {
              return total + current
            }
          }, 0)
        } else {
          return 0
        }
      })

      const datasets: ReportDataset[] = []
      datasets.push({
        label: 'Total Reps',
        borderColor: '#1976D2',
        data: totalReps,
      })
      datasets.push({
        label: 'Total Weight (lbs)',
        borderColor: '#C10015',
        data: totalWeight,
      })

      this.options.plugins.title.text = params?.parent?.name
      this.chartData.labels = params.records.map(() => '')
      this.chartData.datasets = datasets
      this.firstDate = isoToDisplayDate(params.records[0]?.createdDate)
      this.lastDate = isoToDisplayDate(params.records[params.records.length - 1]?.createdDate)
    },

    generateMeasurementReport(params: GenerateReportParams) {
      const measurementValues = params.records.map((r: any) => r?.measurementValue)

      const datasets: ReportDataset[] = []
      datasets.push({
        label: params?.parent?.measurementType,
        borderColor: '#1976D2',
        data: measurementValues,
      })

      this.options.plugins.title.text = params?.parent?.name
      this.chartData.labels = params.records.map(() => '')
      this.chartData.datasets = datasets
      this.firstDate = isoToDisplayDate(params.records[0]?.createdDate)
      this.lastDate = isoToDisplayDate(params.records[params.records.length - 1]?.createdDate)
    },

    generateWorkoutReport(params: GenerateReportParams) {
      const duration = params.records.map((r) => {
        const started = new Date(r?.createdDate).getTime()
        const finished = new Date(r?.finishedDate).getTime()
        return (finished - started) / 1000 / 60 // gets the minutes
      })

      const datasets: ReportDataset[] = []
      datasets.push({
        label: 'Duration (minutes)',
        borderColor: '#1976D2',
        data: duration,
      })

      this.options.plugins.title.text = params?.parent?.name
      this.chartData.labels = params.records.map(() => '')
      this.chartData.datasets = datasets
      this.firstDate = isoToDisplayDate(params.records[0]?.createdDate)
      this.lastDate = isoToDisplayDate(params.records[params.records.length - 1]?.createdDate)
    },
  },
})

export default useReportStore
