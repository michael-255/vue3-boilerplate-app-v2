import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useDataTableStore from '@/stores/data-table'

describe('data-table store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('should have expected properties', () => {
    const store = useDataTableStore()
    const keys = Object.keys(store)
    expect(store.$id).toBe('data-table')
    expect(keys.includes('selectedTab')).toBe(true)
    expect(keys.includes('tabs')).toBe(true)
    expect(keys.includes('rows')).toBe(true)
    expect(keys.includes('columns')).toBe(true)
    expect(keys.includes('columnOptions')).toBe(true)
    expect(keys.includes('visibleColumns')).toBe(true)
  })
})
