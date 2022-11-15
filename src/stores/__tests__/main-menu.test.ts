import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useMainMenuStore from '@/stores/main-menu'

describe('main-menu store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('should have expected properties', () => {
    const store = useMainMenuStore()
    const keys = Object.keys(store)
    expect(store.$id).toBe('main-menu')
    expect(keys.includes('drawer')).toBe(true)
  })
})
