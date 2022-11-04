import type { IndexableType } from 'dexie'
import type { DatabaseObject, SettingValue } from '@/constants/types-interfaces'
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

  /**
   *
   */
  async getMeasurementCards(): Promise<DatabaseObject[]> {
    // Measurements
    const measurements = (await this.getAll(AppTable.MEASUREMENTS)).sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    }) as Measurement[]

    // Measurement Card Objects
    const measurementCards = await Promise.all(
      // Recent Measurement Records
      measurements.map(async (measurement: Measurement) => {
        // Get most recent Measurement Record (if any)
        const measurementRecord = (await this.getNewestByField(
          AppTable.MEASUREMENT_RECORDS,
          Field.PARENT_ID,
          measurement.id
        )) as MeasurementRecord

        return {
          id: measurement.id,
          name: measurement.name,
          measurementType: measurement.measurementType,
          previousCreatedDate: measurementRecord?.createdDate,
          previousMeasurementValue: measurementRecord?.measurementValue,
        }
      })
    )

    return measurementCards
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
   * Update provided properties on table item by the originalId.
   * @param table
   * @param originalId
   * @param props
   * @returns 1 on a successful update
   */
  async updateById<T>(
    table: AppTable,
    originalId: string,
    props: Partial<T>
  ): Promise<IndexableType> {
    return await this.dexieWrapper.table(table).update(originalId, props)
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

    let darkModeValue = settings.find(
      (setting: DatabaseObject) => setting[Field.ID] === SettingKey.DARK_MODE
    )?.settingValue

    let showConsoleLogsValue = settings.find(
      (setting: DatabaseObject) => setting[Field.ID] === SettingKey.SHOW_CONSOLE_LOGS
    )?.settingValue

    let showDebugMessagesValue = settings.find(
      (setting: DatabaseObject) => setting[Field.ID] === SettingKey.SHOW_DEBUG_MESSAGES
    )?.settingValue

    let saveInfoMessagesValue = settings.find(
      (setting: DatabaseObject) => setting[Field.ID] === SettingKey.SAVE_INFO_MESSAGES
    )?.settingValue

    // Create the Setting records with a default value if it doesn't exist
    if (darkModeValue === undefined) {
      darkModeValue = true // default

      await this.add(AppTable.SETTINGS, {
        id: SettingKey.DARK_MODE,
        createdDate: new Date().toISOString(),
        settingValue: darkModeValue,
      })
    }

    if (showConsoleLogsValue === undefined) {
      showConsoleLogsValue = false // default

      await this.add(AppTable.SETTINGS, {
        id: SettingKey.SHOW_CONSOLE_LOGS,
        createdDate: new Date().toISOString(),
        settingValue: showConsoleLogsValue,
      })
    }

    if (showDebugMessagesValue === undefined) {
      showDebugMessagesValue = false // default

      await this.add(AppTable.SETTINGS, {
        id: SettingKey.SHOW_DEBUG_MESSAGES,
        createdDate: new Date().toISOString(),
        settingValue: showDebugMessagesValue,
      })
    }

    if (saveInfoMessagesValue === undefined) {
      saveInfoMessagesValue = false // default

      await this.add(AppTable.SETTINGS, {
        id: SettingKey.SAVE_INFO_MESSAGES,
        createdDate: new Date().toISOString(),
        settingValue: saveInfoMessagesValue,
      })
    }

    return {
      darkModeValue,
      showConsoleLogsValue,
      showDebugMessagesValue,
      saveInfoMessagesValue,
    }
  }

  //
  // Model Operations
  //

  /**
   * @todo
   * @param table
   * @param data
   * @returns
   */
  async callCreate(table: AppTable, data: DatabaseObject): Promise<void> {
    return await {
      [AppTable.MEASUREMENTS]: Measurement.create,
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.create,
      [AppTable.LOGS]: Log.create,
      [AppTable.SETTINGS]: Setting.create,
    }[table](this, data) // Execute async function before returning
  }

  /**
   * @todo
   * @param table
   * @param originalId
   * @param props
   * @returns
   */
  async callUpdate(table: AppTable, originalId: string, props: DatabaseObject): Promise<void> {
    return await {
      [AppTable.MEASUREMENTS]: Measurement.update,
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.update,
      [AppTable.LOGS]: Log.update,
      [AppTable.SETTINGS]: Setting.update,
    }[table](this, originalId, props) // Execute async function before returning
  }

  /**
   * @todo
   * @param table
   * @param id
   * @returns
   */
  async callReport(table: AppTable, id: string): Promise<any> {
    return await {
      [AppTable.MEASUREMENTS]: Measurement.report,
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.report,
      [AppTable.LOGS]: Log.report,
      [AppTable.SETTINGS]: Setting.report,
    }[table](this, id) // Execute async function before returning
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const DB = new LocalDatabase(new DexieWrapper(`${AppString.APP_NAME} v${AppString.VERSION}`))
