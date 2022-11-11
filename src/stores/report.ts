import { defineStore, type StoreDefinition } from 'pinia'

/**
 * All data needed for displaying a specific report should be generated and stored here.
 */
const useReportStore: StoreDefinition = defineStore({
  id: 'report',

  state: () => ({
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
  }),
})

export default useReportStore
