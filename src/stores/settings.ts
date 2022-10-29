import { defineStore, type StoreDefinition } from 'pinia'

/**
 * App settings state.
 */
const useSettingsStore: StoreDefinition = defineStore({
  id: 'settings',

  state: () => ({
    // The real defaults for these are set in DB.initDatabaseSettings()
    darkMode: false,
    showConsoleLogs: false,
    showDebugMessages: false,
    saveInfoMessages: false,
  }),

  actions: {
    setDarkMode(bool: boolean): void {
      this.darkMode = !!bool
    },

    setShowConsoleLogs(bool: boolean): void {
      this.showConsoleLogs = !!bool
    },

    setShowDebugMessages(bool: boolean): void {
      this.showDebugMessages = !!bool
    },

    setSaveInfoMessages(bool: boolean): void {
      this.saveInfoMessages = !!bool
    },
  },
})

export default useSettingsStore
