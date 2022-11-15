import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '@/services/LocalDatabase'

const dexieWrapperMock = {
  table: vi.fn().mockReturnValue({
    toArray: vi.fn(),
    where: vi.fn().mockReturnValue({
      equalsIgnoreCase: vi.fn().mockReturnValue({
        first: vi.fn(),
        toArray: vi.fn(),
        sortBy: vi.fn().mockReturnValue({
          reverse: vi.fn(),
        }),
      }),
    }),
    bulkGet: vi.fn().mockReturnValue({
      filter: vi.fn(),
    }),
    add: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    clear: vi.fn(),
    bulkAdd: vi.fn(),
  }),
  delete: vi.fn(),
}

describe('LocalDatabase service', () => {
  let database: any
  const testTable = 'testTable'
  const testField = 'id'
  const testId = 'test-id-123'
  const testIds = ['id-1', 'id-2', 'id-3']
  const testName = 'Test Name'
  const testData = { id: 'test1' }
  const testDatas = [{ id: 'test1' }, { id: 'test2' }]

  beforeEach(() => {
    database = new LocalDatabase(dexieWrapperMock as any)
    vi.clearAllMocks()
  })

  test('getAll return all items from a table', async () => {
    database.dexieWrapper.table().toArray = vi.fn().mockReturnValue(testDatas)

    const result = await database.getAll(testTable)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().toArray).toHaveBeenCalled()
    expect(result).toEqual(expect.arrayContaining(testDatas))
  })

  test('getAllByField returns all items by field with value', async () => {
    database.dexieWrapper.table().where().equalsIgnoreCase().sortBy = vi
      .fn()
      .mockReturnValue(testDatas)

    const result = await database.getAllByField(testTable, testField, testId)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().where).toHaveBeenCalledWith(testField)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase().sortBy).toHaveBeenCalledWith(
      'createdDate'
    )
    expect(result).toEqual(expect.arrayContaining(testDatas))
  })

  test('getFirstByField returns first item by field with value', async () => {
    database.dexieWrapper.table().where().equalsIgnoreCase().first = vi
      .fn()
      .mockReturnValue(testData)

    const result = await database.getFirstByField(testTable, testField, testId)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().where).toHaveBeenCalledWith(testField)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase().first).toHaveBeenCalled()
    expect(result).toBe(testData)
  })

  test('getNewestByField returns item with newest created date by field with value', async () => {
    database.dexieWrapper.table().where().equalsIgnoreCase().sortBy().reverse = vi
      .fn()
      .mockReturnValue(testDatas)

    const result = await database.getNewestByField(testTable, testField, testId)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().where).toHaveBeenCalledWith(testField)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase().sortBy).toHaveBeenCalledWith(
      'createdDate'
    )
    expect(
      database.dexieWrapper.table().where().equalsIgnoreCase().sortBy().reverse
    ).toHaveBeenCalled()
    expect(result).toBe(testDatas[0]) // It takes the first result after the reverse
  })

  test('bulkGetByIds returns items from the table by the provided ids', async () => {
    database.dexieWrapper.table().bulkGet = vi.fn().mockReturnValue(testDatas)

    const result = await database.bulkGetByIds(testTable, testIds)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().bulkGet).toHaveBeenCalledWith(testIds)
    expect(result).toEqual(expect.arrayContaining(testDatas))
  })

  test('add inserts the new item into the table and returns the id', async () => {
    database.dexieWrapper.table().add = vi.fn().mockReturnValue(testId)

    const result = await database.add(testTable, testData)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().add).toHaveBeenCalledWith(testData)
    expect(result).toBe(testId)
  })

  test('bulkAdd inserts the new items in the table and returns the ids', async () => {
    database.dexieWrapper.table().bulkAdd = vi.fn().mockReturnValue(testIds)

    const result = await database.bulkAdd(testTable, testDatas)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().bulkAdd).toHaveBeenCalledWith(testDatas, { allKeys: true })
    expect(result).toBe(testIds)
  })

  test('updateById updates the item by id and returns a 1 on success', async () => {
    database.dexieWrapper.table().update = vi.fn().mockReturnValue(1)

    const properties = { name: testName }
    const result = await database.updateById(testTable, testId, properties)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().update).toHaveBeenCalledWith(testId, properties)
    expect(result).toBe(1)
  })

  test('deleteById returns undefined when nothing is deleted', async () => {
    database.dexieWrapper.table().where().equalsIgnoreCase().first = vi
      .fn()
      .mockReturnValue(undefined)

    const result = await database.deleteById(testTable, testId)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().where).toHaveBeenCalledWith('id')
    expect(database.dexieWrapper.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase().first).toHaveBeenCalled()
    expect(result).toBe(undefined)
  })

  test('deleteById returns the item that was deleted', async () => {
    database.dexieWrapper.table().where().equalsIgnoreCase().first = vi
      .fn()
      .mockReturnValue(testData)

    const result = await database.deleteById(testTable, testId)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().where).toHaveBeenCalledWith('id')
    expect(database.dexieWrapper.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.dexieWrapper.table().where().equalsIgnoreCase().first).toHaveBeenCalled()
    expect(result).toBe(testData)
  })

  test('clear removes all table data and returns undefined', async () => {
    database.dexieWrapper.table().clear = vi.fn().mockReturnValue(undefined)

    const result = await database.clear(testTable)
    expect(database.dexieWrapper.table).toHaveBeenCalledWith(testTable)
    expect(database.dexieWrapper.table().clear).toHaveBeenCalled()
    expect(result).toBe(undefined)
  })

  test('deleteDatabase deletes the database from the browser application', async () => {
    await database.deleteDatabase()
    expect(database.dexieWrapper.delete).toHaveBeenCalled()
  })
})
