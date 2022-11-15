import { describe, test, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useOperationDialog from '@/stores/operation-dialog'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'

describe('data-table store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  test('should have expected properties', () => {
    const store = useOperationDialog()
    const keys = Object.keys(store)
    expect(store.$id).toBe('operation-dialog')
    expect(keys.includes('isActive')).toBe(true)
    expect(keys.includes('table')).toBe(true)
    expect(keys.includes('operation')).toBe(true)
    expect(keys.includes('title')).toBe(true)
    expect(keys.includes('selectedItem')).toBe(true)
    expect(keys.includes('temporaryItem')).toBe(true)
    expect(keys.includes('validateItem')).toBe(true)
    expect(keys.includes('reportCharts')).toBe(true)
  })

  test('openDialog and closeDialog should change the dialog state based on the params', async () => {
    const store = useOperationDialog()
    expect(store.isActive).toBe(false)
    expect(store.operation).toBe(Operation.NOOP)
    expect(store.title).toBe('')
    expect(store.table).toBe('')
    expect(store.selectedItem.id).toBe(null)

    store.openDialog(AppTable.LOGS, Operation.INSPECT, { id: 'test-id' })

    expect(store.isActive).toBe(true)
    expect(store.operation).toBe(Operation.INSPECT)
    expect(store.title).toBe('Inspect Log')
    expect(store.table).toBe('logs')
    expect(store.selectedItem.id).toBe('test-id')

    const databaseMock = {
      getAll: vi.fn().mockReturnValue([]),
    }

    store.closeDialog(databaseMock as any)

    expect(store.isActive).toBe(false)
    expect(store.operation).toBe(Operation.NOOP)
    expect(store.title).toBe('')
    expect(store.table).toBe('')
    expect(store.selectedItem.id).toBe(null)
  })

  test('addReportChart should create a report with params', async () => {
    const store = useOperationDialog()
    expect(store.reportCharts).toEqual(expect.arrayContaining([]))

    store.addReportChart(
      'Test',
      '2022',
      '2023',
      ['', ''],
      [
        {
          label: 'A',
          borderColor: '#000000',
          data: [1, 2],
        },
        {
          label: 'B',
          borderColor: '#111111',
          data: [3, 4],
        },
      ]
    )

    expect(store.reportCharts).toMatchObject([
      {
        options: {
          responsive: true,
          radius: 3,
          plugins: {
            title: {
              display: true,
              text: 'Test',
            },
            legend: {
              display: true,
            },
          },
        },
        chartData: {
          labels: ['', ''],
          datasets: [
            {
              label: 'A',
              borderColor: '#000000',
              data: [1, 2],
            },
            {
              label: 'B',
              borderColor: '#111111',
              data: [3, 4],
            },
          ],
        },
        firstRecordDate: '2022',
        lastRecordDate: '2023',
      },
    ])
  })

  test('areItemFieldsValid should check the validateItem state', async () => {
    const store = useOperationDialog()
    const result = store.areItemFieldsValid([Field.ID, Field.CREATED_DATE])
    expect(result).toBe(false)
  })
})
