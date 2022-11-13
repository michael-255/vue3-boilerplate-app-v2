import { Activity, type IActivity } from '@/models/__Activity'
import type { DataTableProps } from '@/constants/types-interfaces'
import { AppTable, Operation, type Severity } from '@/constants/core/data-enums'
import { Field } from '@/constants/core/data-enums'
import { truncateString, uuid } from '@/utils/common'

export interface ILog extends IActivity {
  severity: Severity
  details: string
  message?: string
  stack?: string
}

export interface LogParams {
  severity: Severity
  details: string
  error?: Error | any
}

/**
 * Log Class
 * @param params.error Error or any if unknown
 * @param params.severity Severity
 * @param params.details Information about the error
 */
export class Log extends Activity {
  severity: Severity
  details: string
  message?: string
  stack?: string

  constructor(params: LogParams) {
    super({ id: uuid(), createdDate: new Date().toISOString(), name: params?.error?.name })
    this.severity = params?.severity
    this.details = params?.details
    this.message = params?.error?.message
    this.stack = params?.error?.stack
  }

  static async report(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static async update(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static async create(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static getLabelSingular(): string {
    return 'Log'
  }

  static getLabelPlural(): string {
    return 'Logs'
  }

  static getParentTable(): AppTable | null {
    return null
  }

  static getOperations(): Operation[] {
    return [Operation.DELETE, Operation.CLEAR, Operation.INSPECT]
  }

  static getVisibleColumns(): Field[] {
    return [Field.CREATED_DATE, Field.SEVERITY, Field.NAME]
  }

  static getFields() {
    return [...Activity.getFields(), Field.SEVERITY, Field.DETAILS, Field.MESSAGE, Field.STACK]
  }

  static getFieldComponents(): any {
    return []
  }

  static getColumns(): DataTableProps[] {
    return [
      ...Activity.getColumns(),
      {
        name: Field.SEVERITY,
        label: 'Severity',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.SEVERITY],
        format: (val: string) => val,
      },
      {
        name: Field.DETAILS,
        label: 'Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.DETAILS],
        format: (val: string) => truncateString(val),
      },
      {
        name: Field.MESSAGE,
        label: 'Messages',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.MESSAGE],
        format: (val: string) => truncateString(val),
      },
      {
        name: Field.STACK,
        label: 'Stack',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.STACK],
        format: (val: string) => truncateString(val),
      },
    ]
  }
}
