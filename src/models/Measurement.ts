import { Activity, type IActivity } from '@/models/__Activity'
import type { DataTableProps, DatabaseObject } from '@/constants/types-interfaces'
import type { LocalDatabase } from '@/services/LocalDatabase'
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import { AppTable, Operation, type MeasurementType } from '@/constants/core/data-enums'
import { Field } from '@/constants/core/data-enums'
import { isoToDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'

export interface IMeasurement extends IActivity {
  measurementType: MeasurementType
}

/**
 * Measurement Class
 * @param params IMeasurement
 */
export class Measurement extends Activity {
  measurementType: MeasurementType

  constructor(params: IMeasurement) {
    super({
      id: params.id,
      createdDate: params.createdDate,
      name: params.name,
    })
    this.measurementType = params.measurementType
  }

  /**
   * Creates the chart data and settings for the reports.
   * @param database
   * @param id
   */
  static async report(database: LocalDatabase, id: string): Promise<any> {
    const records = (await database.getAllByField(
      AppTable.MEASUREMENT_RECORDS,
      Field.PARENT_ID,
      id
    )) as MeasurementRecord[]

    const parent = (await database.getFirstByField(
      AppTable.MEASUREMENTS,
      Field.ID,
      id
    )) as Measurement

    const measurementValues = records.map((r: MeasurementRecord) => r?.measurementValue)

    const datasets = []
    datasets.push({
      label: parent?.measurementType,
      borderColor: '#1976D2',
      data: measurementValues,
    })

    return {
      title: parent?.name,
      labels: records.map(() => ''),
      datasets: datasets,
      firstDate: isoToDisplayDate(records[0]?.createdDate),
      lastDate: isoToDisplayDate(records[records.length - 1]?.createdDate),
    }
  }

  static async update(
    database: LocalDatabase,
    originalId: string,
    props: DatabaseObject
  ): Promise<void> {
    const { id, createdDate, name, measurementType } = props
    await database.updateById(
      AppTable.MEASUREMENTS,
      originalId,
      new Measurement({ id, createdDate, name, measurementType })
    )
  }

  static async create(database: LocalDatabase, data: DatabaseObject): Promise<void> {
    const { id, createdDate, name, measurementType } = data
    await database.add(
      AppTable.MEASUREMENTS,
      new Measurement({ id, createdDate, name, measurementType })
    )
  }

  static getLabelSingular(): string {
    return 'Measurement'
  }

  static getLabelPlural(): string {
    return 'Measurements'
  }

  static getParentTable(): AppTable | null {
    return null
  }

  static getOperations(): Operation[] {
    return [
      Operation.CREATE,
      Operation.UPDATE,
      Operation.REPORT,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
    ]
  }

  static getVisibleColumns(): Field[] {
    return [Field.NAME, Field.MEASUREMENT_TYPE]
  }

  static getFields(): Field[] {
    return [...Activity.getFields(), Field.MEASUREMENT_TYPE]
  }

  static getFieldComponents(): any {
    return [
      ...Activity.getFieldComponents(),
      defineAsyncComponent(
        () => import('@/components/data-tables/inputs/MeasurementTypeSelect.vue')
      ),
    ]
  }

  static getColumns(): DataTableProps[] {
    return [
      ...Activity.getColumns(),
      {
        name: Field.MEASUREMENT_TYPE,
        label: 'Type',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.MEASUREMENT_TYPE],
        format: (val: string) => val,
      },
    ]
  }
}
