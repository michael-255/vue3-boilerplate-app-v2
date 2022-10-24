import Dexie, { type Table } from 'dexie'
import { Log, type ILog } from '@/models/__Log'
import { Setting, type ISetting } from '@/models/__Setting'
import { Measurement, type IMeasurement } from '@/models/Measurement'
import { MeasurementRecord, type IMeasurementRecord } from '@/models/MeasurementRecord'
import { AppTable, Field } from '@/constants/core/data-enums'

/**
 * Wrapper for Dexie IndexedDB
 * @param name Database name
 */
export class DexieWrapper extends Dexie {
  // Information for the typing system to help Dexie out
  // REQUIRED
  [AppTable.MEASUREMENTS]!: Table<IMeasurement>;
  [AppTable.MEASUREMENT_RECORDS]!: Table<IMeasurementRecord>;
  [AppTable.LOGS]!: Table<ILog>;
  [AppTable.SETTINGS]!: Table<ISetting>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      // REQUIRED
      [AppTable.MEASUREMENTS]: `&${Field.ID}`,
      [AppTable.MEASUREMENT_RECORDS]: `&${Field.ID}, ${Field.PARENT_ID}`,
      [AppTable.LOGS]: `&${Field.ID}`,
      [AppTable.SETTINGS]: `&${Field.ID}`,
    })

    // REQUIRED
    this[AppTable.MEASUREMENTS].mapToClass(Measurement)
    this[AppTable.MEASUREMENT_RECORDS].mapToClass(MeasurementRecord)
    this[AppTable.LOGS].mapToClass(Log)
    this[AppTable.SETTINGS].mapToClass(Setting)
  }
}
