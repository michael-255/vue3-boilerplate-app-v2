import { defineStore, type StoreDefinition } from 'pinia'

/**
 * App settings state.
 */
const useSettingsStore: StoreDefinition = defineStore({
  id: 'settings',

  state: () => ({
    DEBUG: false,
    NOTIFY: false,
    INFO: false,
  }),

  actions: {
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
