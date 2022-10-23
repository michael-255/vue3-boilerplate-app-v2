import Dexie, { type IndexableType, type Table } from 'dexie'
import { AppTable, SettingKey, Field, Operation } from '@/constants/data-enums'
import { Log, type ILog } from '@/models/__Log'
import { Setting, type ISetting } from '@/models/__Setting'
import type { DatabaseObject, DataTableProps, SettingValue } from '@/constants/types-interfaces'
import { Measurement, type IMeasurement } from '@/models/Measurement'
import { MeasurementRecord, type IMeasurementRecord } from '@/models/MeasurementRecord'

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

  /**
   * Get all items from table.
   * @param table
   * @returns Array of all table items
   */
  async getAll<T>(table: AppTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  /**
   * Get all data from table with a specific field value.
   * @param table
   * @param field Class field
   * @returns
   */
  async getAllByField<T>(table: AppTable, field: Field, value: any): Promise<T[]> {
    return await this.table(table).where(field).equalsIgnoreCase(value).toArray()
  }

  async getFirstByField<T>(table: AppTable, field: Field, value: any): Promise<T | undefined> {
    return await this.table(table).where(field).equalsIgnoreCase(value).first()
  }

  async getNewestByField<T>(table: AppTable, field: Field, value: any): Promise<T | undefined> {
    return (
      await this.table(table).where(field).equalsIgnoreCase(value).sortBy(Field.CREATED_DATE)
    ).reverse()[0]
  }

  /**
   * Get item from table by id.
   * @param table
   * @param id
   * @returns Single item or undefined
   */
  async getById<T>(table: AppTable, id: string): Promise<T | undefined> {
    return await this.table(table).where(Field.ID).equalsIgnoreCase(id).first()
  }

  /**
   * Get items from table by name.
   * @param table
   * @param name
   * @returns Array of items
   */
  async getByName<T>(table: AppTable, name: string): Promise<T[]> {
    return await this.table(table).where(Field.NAME).equalsIgnoreCase(name).toArray()
  }

  /**
   * Get items from table by parentId.
   * @param table
   * @param parentId
   * @returns Array of items
   */
  async getByParentId<T>(table: AppTable, parentId: string): Promise<T[]> {
    return await this.table(table)
      .where(Field.PARENT_ID)
      .equalsIgnoreCase(parentId)
      .sortBy(Field.CREATED_DATE)
  }

  /**
   * Get newest item from table by parentId.
   * @param table
   * @param parentId
   * @returns Newest item or undefined
   */
  async getNewestByParentId<T>(table: AppTable, parentId: string): Promise<T | undefined> {
    return (
      await this.table(table)
        .where(Field.PARENT_ID)
        .equalsIgnoreCase(parentId)
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
    return (await this.table(table).bulkGet(ids)).filter(Boolean)
  }

  /**
   * Delete item in table by id.
   * @param table
   * @param id
   * @returns undefined even if nothing was deleted
   */
  async deleteById<T>(table: AppTable, id: string): Promise<T | undefined> {
    const itemToDelete: T | undefined = await this.table(table)
      .where(Field.ID)
      .equalsIgnoreCase(id)
      .first()

    if (itemToDelete) {
      await this.table(table).delete(id)
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
    return await this.table(table).clear()
  }

  /**
   * Add item to table.
   * @param table
   * @param item
   * @returns Id of new item
   */
  async add<T>(table: AppTable, item: T): Promise<IndexableType> {
    return await this.table(table).add(item)
  }

  /**
   * Add items to table.
   * @param table
   * @param items
   * @returns Array of new item ids
   */
  async bulkAdd<T>(table: AppTable, items: T[]): Promise<IndexableType[]> {
    return await this.table(table).bulkAdd(items, { allKeys: true })
  }

  /**
   * Update provided properties on table item by id.
   * @param table
   * @param id
   * @param props
   * @returns 1 on a successful update
   */
  async updateById<T>(table: AppTable, id: string, props: Partial<T>): Promise<IndexableType> {
    return await this.table(table).update(id, props)
  }
}
