import type { IndexableType } from 'dexie'
import type { DatabaseObject } from '@/constants/types-interfaces'
import { AppTable, Field } from '@/constants/core/data-enums'
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
    return await this.dexieWrapper
      .table(table)
      .where(field)
      .equalsIgnoreCase(value)
      .sortBy(Field.CREATED_DATE)
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
  // Model Operations
  //

  /**
   * Calls the model create method.
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
   * Call the model update method.
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
   * Calls the model report method
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
