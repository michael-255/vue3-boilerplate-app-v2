import { describe, test, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useSettingsStore from '@/stores/settings'

describe('data-table store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  test('should have expected properties', () => {
    const store = useSettingsStore()
    const keys = Object.keys(store)
    expect(store.$id).toBe('settings')
    expect(keys.includes('darkMode')).toBe(true)
    expect(keys.includes('showConsoleLogs')).toBe(true)
    expect(keys.includes('showDebugMessages')).toBe(true)
    expect(keys.includes('saveInfoMessages')).toBe(true)
  })

  test('initSettings should default the state settings when none are found', async () => {
    const store = useSettingsStore()
    // State defaults
    expect(store.darkMode).toBe(false)
    expect(store.showConsoleLogs).toBe(false)
    expect(store.showDebugMessages).toBe(false)
    expect(store.saveInfoMessages).toBe(false)

    const databaseMock = {
      add: vi.fn(),
      getAll: vi.fn().mockReturnValue([]),
    }

    await store.initSettings(databaseMock as any)

    // Initialized defaults
    expect(store.darkMode).toBe(true)
    expect(store.showConsoleLogs).toBe(false)
    expect(store.showDebugMessages).toBe(false)
    expect(store.saveInfoMessages).toBe(false)
  })

  test('initSettings should initialize the state settings with existing settings if found', async () => {
    const store = useSettingsStore()
    // State defaults
    expect(store.darkMode).toBe(false)
    expect(store.showConsoleLogs).toBe(false)
    expect(store.showDebugMessages).toBe(false)
    expect(store.saveInfoMessages).toBe(false)

    const databaseMock = {
      add: vi.fn(),
      getAll: vi.fn().mockReturnValue([
        {
          id: 'dark-mode',
          settingValue: true,
        },
        {
          id: 'show-console-logs',
          settingValue: true,
        },
        {
          id: 'show-debug-messages',
          settingValue: true,
        },
        {
          id: 'save-info-messages',
          settingValue: true,
        },
      ]),
    }

    await store.initSettings(databaseMock as any)

    // Initialized defaults
    expect(store.darkMode).toBe(true)
    expect(store.showConsoleLogs).toBe(true)
    expect(store.showDebugMessages).toBe(true)
    expect(store.saveInfoMessages).toBe(true)
  })
})
