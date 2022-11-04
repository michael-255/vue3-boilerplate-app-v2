import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Stores the measurements and the most recent record data.
 */
const useTakeMeasurementsStore: StoreDefinition = defineStore({
  id: 'take-measurements',

  state: () => ({
    measurementCards: [],
  }),
})

export default useTakeMeasurementsStore
