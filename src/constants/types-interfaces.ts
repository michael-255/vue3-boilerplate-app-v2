import type { AppTable, Field } from '@/constants/core/data-enums'
import type { Icon } from '@/constants/ui/icon-enums'

/**
 * Generic type for an object the string based keys storing any value.
 */
export type DatabaseObject = { [x: string]: any }

/**
 * App settings currently only support these values.
 */
export type SettingValue = boolean | string | number

/**
 * Properties used to display data items in a QTable.
 */
export type DataTableProps = {
  name: Field
  label: string
  align: string
  sortable: boolean
  required: boolean
  field: (val: any) => any
  format: (val: any) => any
}

export type RouteMeta = {
  layout: string
  tabs?: RouteTab[]
}

export type RouteTab = {
  name: string
  icon: Icon
  table: AppTable
}

export type ReportChart = {
  options: ChartOptions
  firstRecordDate: string
  lastRecordDate: string
  chartData: ChartData
}

export type ChartOptions = {
  responsive: boolean
  radius: number
  plugins: { [x: string]: any }
}

export type ChartData = {
  labels: string[]
  datasets: ChartDataset[]
}

export type ChartDataset = {
  label: string
  borderColor: string
  data: number[]
}
