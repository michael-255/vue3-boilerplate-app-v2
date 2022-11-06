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

/**
 * The actions you can perform on a table row.
 */
export type TableActions = {
  getRows?: () => Promise<any[]>
  createRow?: (x: DatabaseObject) => any
  updateRow?: (x: DatabaseObject) => any
  generateReport?: (id: string) => any
}

export type ReportChartData = {
  labels: any[]
  datasets: ReportDataset[]
}

export type ReportDataset = {
  label: string
  borderColor: string
  data: any[]
}

export type RouteMeta = {
  layout: string
  table?: AppTable
  tabs?: RouteTab[]
}

export type RouteTab = {
  name: string
  icon: Icon
  table: AppTable
}
