import { defineStore, type StoreDefinition } from 'pinia'

/**
 * All data needed for displaying a specific report should be generated and stored here.
 */
const useReportStore: StoreDefinition = defineStore({
  id: 'report',

  state: () => ({
    firstDate: '-',
    lastDate: '-',
    chartData: {
      labels: [],
      datasets: [],
    },
    reportCharts: [], // @todo - For multiple charts!
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
  }),

  actions: {
    createChart() {
      /**
       * @todo - Each chart would be one of these...
       */
      const reportCharts = [
        {
          firstRecordedDate: '-',
          lastRecordedDate: '-',
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
        },
      ]
    },
  },
})

export default useReportStore
