import { defineStore, type StoreDefinition } from 'pinia'

/**
 * App settings state.
 */
const useSettingsStore: StoreDefinition = defineStore({
  id: 'settings',

  state: () => ({
    // deprecated settings (WIP)
    DEBUG: false,
    NOTIFY: false,
    INFO: false,
    // new settings
    darkMode: true,
    suppressConsoleLogs: true,
    hideDebugMessages: true,
    saveInfoMessages: false,
  }),

  actions: {
    setDarkMode(bool: boolean): void {
      this.darkMode = !!bool
    },

    setSuppressConsoleLogs(bool: boolean): void {
      this.suppressConsoleLogs = !!bool
    },

    setHideDebugMessages(bool: boolean): void {
      this.hideDebugMessages = !!bool
    },

    setSaveInfoMessages(bool: boolean): void {
      this.saveInfoMessages = !!bool
    },

    // deprecated settings (WIP)
    setDEBUG(bool: boolean): void {
      this.DEBUG = !!bool
    },

    setNOTIFY(bool: boolean): void {
      this.NOTIFY = !!bool
    },

    setINFO(bool: boolean): void {
      this.INFO = !!bool
    },
  },
})

export default useSettingsStore
