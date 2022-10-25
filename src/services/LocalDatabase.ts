import type { IndexableType } from 'dexie'
import type { DatabaseObject } from '@/constants/types-interfaces'
import { AppTable, Field, SettingKey } from '@/constants/core/data-enums'
import { AppString } from '@/constants/ui/string-enums'
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

  /**
   * Completely deletes the database and all of its data (must reload the app after).
   * @returns undefined
   */
  async deleteDatabase(): Promise<void> {
    return await this.dexieWrapper.delete()
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
  // Model Operations
  //

  /**
   * GetAll code is here versus the models since its so small.
   * @param table
   * @returns Data rows
   */
  async callGetAll(table: AppTable): Promise<any> {
    switch (table) {
      case AppTable.MEASUREMENTS:
        return await this.getAll<Measurement>(table)
      case AppTable.MEASUREMENT_RECORDS:
        return await this.getAll<MeasurementRecord>(table)
      case AppTable.LOGS:
        return await this.getAll<Log>(table)
      case AppTable.SETTINGS:
        return await this.getAll<Setting>(table)
      default:
        console.error('Table not recognized')
    }
  }

  /**
   * @todo
   * @param table
   * @param data
   * @returns
   */
  async callCreate(table: AppTable, data: DatabaseObject): Promise<void> {
    switch (table) {
      case AppTable.MEASUREMENTS:
        return await Measurement.create(this, data)
      case AppTable.MEASUREMENT_RECORDS:
        return await MeasurementRecord.create(this, data)
      case AppTable.LOGS:
        return await Log.create(this, data)
      case AppTable.SETTINGS:
        return await Setting.create(this, data)
      default:
        console.error('Table not recognized')
    }
  }

  /**
   * @todo
   * @param table
   * @param data
   * @returns
   */
  async callUpdate(table: AppTable, data: DatabaseObject): Promise<void> {
    switch (table) {
      case AppTable.MEASUREMENTS:
        return await Measurement.update(this, data)
      case AppTable.MEASUREMENT_RECORDS:
        return await MeasurementRecord.update(this, data)
      case AppTable.LOGS:
        return await Log.update(this, data)
      case AppTable.SETTINGS:
        return await Setting.update(this, data)
      default:
        console.error('Table not recognized')
    }
  }

  /**
   * @todo
   * @param table
   * @param id
   * @returns
   */
  async callReport(table: AppTable, id: string): Promise<void> {
    switch (table) {
      case AppTable.MEASUREMENTS:
        return await Measurement.report(this, id)
      case AppTable.MEASUREMENT_RECORDS:
        return await MeasurementRecord.report(this, id)
      case AppTable.LOGS:
        return await Log.report(this, id)
      case AppTable.SETTINGS:
        return await Setting.report(this, id)
      default:
        console.error('Table not recognized')
    }
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const DB = new LocalDatabase(new DexieWrapper(`${AppString.APP_NAME} v${AppString.VERSION}`))
