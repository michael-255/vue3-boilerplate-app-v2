import { describe, test, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useTakeMeasurementsStore from '@/stores/take-measurements'

describe('data-table store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  test('should have expected properties', () => {
    const store = useTakeMeasurementsStore()
    const keys = Object.keys(store)
    expect(store.$id).toBe('take-measurements')
    expect(keys.includes('measurementCards')).toBe(true)
  })

  test('updateMeasurementCards should fill measurementCards state with updated items', async () => {
    const store = useTakeMeasurementsStore()
    const testGetAll = [
      {
        id: 'test-id-1',
        name: 'test-name-1',
        measurementType: 'test-type-1',
      },
    ]
    const testNewest = {
      id: testGetAll[0].id,
      name: testGetAll[0].name,
      measurementType: testGetAll[0].measurementType,
      createdDate: '2023-01-01T00:00:00.000Z',
      measurementValue: 12345,
    }

    expect(store.measurementCards).toEqual(expect.arrayContaining([]))

    const databaseMock = {
      getAll: vi.fn().mockReturnValue(testGetAll),
      getNewestByField: vi.fn().mockReturnValue(testNewest),
    }

    await store.updateMeasurementCards(databaseMock as any)

    expect(store.measurementCards).toMatchObject([
      {
        id: testNewest.id,
        name: testNewest.name,
        measurementType: testNewest.measurementType,
        previousCreatedDate: testNewest.createdDate,
        previousMeasurementValue: testNewest.measurementValue,
      },
    ])
  })
})
