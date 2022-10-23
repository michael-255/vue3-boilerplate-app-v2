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
    async setDEBUG(bool: boolean): Promise<void> {
      this.DEBUG = !!bool
    },

    async setNOTIFY(bool: boolean): Promise<void> {
      this.NOTIFY = !!bool
    },

    async setINFO(bool: boolean): Promise<void> {
      this.INFO = !!bool
    },
  },
})

export default useSettingsStore
