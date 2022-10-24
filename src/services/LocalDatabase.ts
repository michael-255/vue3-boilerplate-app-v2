import type { IndexableType } from 'dexie'
import type { DatabaseObject, DataTableProps } from '@/constants/types-interfaces'
import { AppTable, Field, Operation, SettingKey } from '@/constants/data-enums'
import { Strings } from '@/constants/ui-enums'
import { DexieWrapper } from './__DexieWrapper'
import { Log } from '@/models/__Log'
import { Setting } from '@/models/__Setting'
import { Measurement } from '@/models/Measurement'
import { MeasurementRecord } from '@/models/MeasurementRecord'

export class LocalDatabase {
  dexieWrapper: DexieWrapper

  constructor(dexieWrapper: DexieWrapper) {
    this.dexieWrapper = dexieWrapper
  }

  //
  // Gets
  //

  /**
   * Get all items from table.
   * @param table
   * @returns Array of all table items
   */
  async getAll<T>(table: AppTable): Promise<T[]> {
    return await this.dexieWrapper.table(table).toArray()
  }

  /**
   * Get all data from table with a specific field value.
   * @param table
   * @param field
   * @param value
   * @returns Array of data from table with matching field value
   */
  async getAllByField<T>(table: AppTable, field: Field, value: any): Promise<T[]> {
    return await this.dexieWrapper.table(table).where(field).equalsIgnoreCase(value).toArray()
  }

  /**
   * Get first item by table and field vlaue.
   * @param table
   * @param field
   * @param value
   * @returns Single item or undefined
   */
  async getFirstByField<T>(table: AppTable, field: Field, value: any): Promise<T | undefined> {
    return await this.dexieWrapper.table(table).where(field).equalsIgnoreCase(value).first()
  }

  /**
   * Get most recent item by table and field value.
   * @param table
   * @param field
   * @param value
   * @returns Single item or undefined
   */
  async getNewestByField<T>(table: AppTable, field: Field, value: any): Promise<T | undefined> {
    return (
      await this.dexieWrapper
        .table(table)
        .where(field)
        .equalsIgnoreCase(value)
        .sortBy(Field.CREATED_DATE)
    ).reverse()[0]
  }

  /**
   * Get items from table by array of ids.
   * @param table
   * @param ids
   * @returns Array of items
   */
  async bulkGetByIds<T>(table: AppTable, ids: string[]): Promise<T[]> {
    // Filters out falsy values
    return (await this.dexieWrapper.table(table).bulkGet(ids)).filter(Boolean)
  }

  //
  // Creates, Updates, Deletes
  //

  /**
   * Add item to table.
   * @param table
   * @param item
   * @returns Id of new item
   */
  async add<T>(table: AppTable, item: T): Promise<IndexableType> {
    return await this.dexieWrapper.table(table).add(item)
  }

  /**
   * Add items to table.
   * @param table
   * @param items
   * @returns Array of new item ids
   */
  async bulkAdd<T>(table: AppTable, items: T[]): Promise<IndexableType[]> {
    return await this.dexieWrapper.table(table).bulkAdd(items, { allKeys: true })
  }

  /**
   * Update provided properties on table item by id.
   * @param table
   * @param id
   * @param props
   * @returns 1 on a successful update
   */
  async updateById<T>(table: AppTable, id: string, props: Partial<T>): Promise<IndexableType> {
    return await this.dexieWrapper.table(table).update(id, props)
  }

  /**
   * Delete item in table by id.
   * @param table
   * @param id
   * @returns undefined even if nothing was deleted
   */
  async deleteById<T>(table: AppTable, id: string): Promise<T | undefined> {
    const itemToDelete: T | undefined = await this.dexieWrapper
      .table(table)
      .where(Field.ID)
      .equalsIgnoreCase(id)
      .first()

    if (itemToDelete) {
      await this.dexieWrapper.table(table).delete(id)
      return itemToDelete
    } else {
      return undefined
    }
  }

  /**
   * Clears all items from table.
   * @param table
   * @returns undefined
   */
  async clear(table: AppTable): Promise<void> {
    return await this.dexieWrapper.table(table).clear()
  }

  //
  // Initializers
  //

  /**
   * Initializes setting keys in the settings table with default values.
   */
  async initDatabaseSettings(): Promise<DatabaseObject> {
    const settings = (await this.getAll(AppTable.SETTINGS)) as Setting[]

    const DEBUG = settings.find((s: DatabaseObject) => s[Field.ID] === SettingKey.DEBUG)
    const NOTIFY = settings.find((s: DatabaseObject) => s[Field.ID] === SettingKey.NOTIFY)
    const INFO = settings.find((s: DatabaseObject) => s[Field.ID] === SettingKey.INFO)

    if (!DEBUG) {
      await this.add(AppTable.SETTINGS, {
        id: SettingKey.DEBUG,
        createdDate: new Date().toISOString(),
        settingValue: false,
      })
    }
    if (!NOTIFY) {
      await this.add(AppTable.SETTINGS, {
        id: SettingKey.NOTIFY,
        createdDate: new Date().toISOString(),
        settingValue: false,
      })
    }
    if (!INFO) {
      await this.add(AppTable.SETTINGS, {
        id: SettingKey.INFO,
        createdDate: new Date().toISOString(),
        settingValue: false,
      })
    }

    return {
      DEBUG,
      NOTIFY,
      INFO,
    }
  }

  //
  // Table Operations
  //

  getFieldsForTable(table: AppTable): Field[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getFields(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getFields(),
      [AppTable.LOGS]: Log.getFields(),
      [AppTable.SETTINGS]: Setting.getFields(),
    }[table]
  }

  getComponentsForTable(table: AppTable): any[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getFieldComponents(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getFieldComponents(),
      [AppTable.LOGS]: Log.getFieldComponents(),
      [AppTable.SETTINGS]: Setting.getFieldComponents(),
    }[table]
  }

  getColumnsForTable(table: AppTable): DataTableProps[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getColumns(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getColumns(),
      [AppTable.LOGS]: Log.getColumns(),
      [AppTable.SETTINGS]: Setting.getColumns(),
    }[table]
  }

  getVisibleColumnsForTable(table: AppTable): Field[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getVisibleColumns(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getVisibleColumns(),
      [AppTable.LOGS]: Log.getVisibleColumns(),
      [AppTable.SETTINGS]: Setting.getVisibleColumns(),
    }[table]
  }

  getOperationsForTable(table: AppTable): Operation[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getOperations(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getOperations(),
      [AppTable.LOGS]: Log.getOperations(),
      [AppTable.SETTINGS]: Setting.getOperations(),
    }[table]
  }

  getParentTableForTable(table: AppTable): AppTable | null {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getParentTable(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getParentTable(),
      [AppTable.LOGS]: Log.getParentTable(),
      [AppTable.SETTINGS]: Setting.getParentTable(),
    }[table]
  }

  getLabelPluralForTable(table: AppTable): string {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getLabelPlural(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getLabelPlural(),
      [AppTable.LOGS]: Log.getLabelPlural(),
      [AppTable.SETTINGS]: Setting.getLabelPlural(),
    }[table]
  }

  getLabelSingularForTable(table: AppTable): string {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getLabelSingular(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getLabelSingular(),
      [AppTable.LOGS]: Log.getLabelSingular(),
      [AppTable.SETTINGS]: Setting.getLabelSingular(),
    }[table]
  }

  getAllDataForTable(table: AppTable): any {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getAll(this),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getAll(this),
      [AppTable.LOGS]: Log.getAll(this),
      [AppTable.SETTINGS]: Setting.getAll(this),
    }[table]
  }

  getCreateForTable(table: AppTable, data: DatabaseObject): Promise<void> {
    return {
      [AppTable.MEASUREMENTS]: Measurement.create(this, data),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.create(this, data),
      [AppTable.LOGS]: Log.create(this, data),
      [AppTable.SETTINGS]: Setting.create(this, data),
    }[table]
  }

  getUpdateForTable(table: AppTable, data: DatabaseObject): Promise<void> {
    return {
      [AppTable.MEASUREMENTS]: Measurement.update(this, data),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.update(this, data),
      [AppTable.LOGS]: Log.update(this, data),
      [AppTable.SETTINGS]: Setting.update(this, data),
    }[table]
  }

  getReportForTable(table: AppTable, id: string): Promise<void> {
    return {
      [AppTable.MEASUREMENTS]: Measurement.report(this, id),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.report(this, id),
      [AppTable.LOGS]: Log.report(this, id),
      [AppTable.SETTINGS]: Setting.report(this, id),
    }[table]
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const DB = new LocalDatabase(new DexieWrapper(`${Strings.APP_NAME} v${Strings.VERSION}`))
