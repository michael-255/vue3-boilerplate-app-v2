import { Record, type IRecord } from '@/models/__Record'
import type { DatabaseObject, DataTableProps } from '@/constants/types-interfaces'
import type { LocalDatabase } from '@/services/LocalDatabase'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'
import { defineAsyncComponent } from 'vue'

export interface IMeasurementRecord extends IRecord {
  measurementValue: number
}

/**
 * MeasurementRecord Class
 * @param params IMeasurementRecord
 */
export class MeasurementRecord extends Record {
  measurementValue: number

  constructor(params: IMeasurementRecord) {
    super({
      id: params.id,
      createdDate: params.createdDate,
      parentId: params.parentId,
    })
    this.measurementValue = params.measurementValue
  }

  static async report(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static async update(
    database: LocalDatabase,
    originalId: string,
    props: DatabaseObject
  ): Promise<void> {
    const { id, createdDate, parentId, measurementValue } = props
    await database.updateById(
      AppTable.MEASUREMENT_RECORDS,
      originalId,
      new MeasurementRecord({ id, createdDate, parentId, measurementValue })
    )
  }

  static async create(database: LocalDatabase, data: DatabaseObject): Promise<void> {
    const { id, createdDate, parentId, measurementValue } = data
    await database.add(
      AppTable.MEASUREMENT_RECORDS,
      new MeasurementRecord({ id, createdDate, parentId, measurementValue })
    )
  }

  static getLabelSingular(): string {
    return 'Measurement Record'
  }

  static getLabelPlural(): string {
    return 'Measurement Records'
  }

  static getParentTable(): AppTable | null {
    return AppTable.MEASUREMENTS
  }

  static getOperations(): Operation[] {
    return [
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
    ]
  }

  static getVisibleColumns(): Field[] {
    return [Field.MEASUREMENT_VALUE]
  }

  static getFields() {
    return [...Record.getFields(), Field.MEASUREMENT_VALUE]
  }

  static getFieldComponents(): any {
    return [
      ...Record.getFieldComponents(),
      defineAsyncComponent(
        () => import('@/components/shared/operation-dialog/inputs/MeasurementValueInput.vue')
      ),
    ]
  }

  static getColumns(): DataTableProps[] {
    return [
      ...Record.getColumns(),
      {
        name: Field.MEASUREMENT_VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.MEASUREMENT_VALUE],
        format: (val: number) => val,
      },
    ]
  }
}
