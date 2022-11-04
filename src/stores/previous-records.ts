import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Used to store the most recent records of an activity.
 */
const usePreviousRecordsStore: StoreDefinition = defineStore({
  id: 'previous-records',

  state: () => ({
    records: [],
  }),
})

export default usePreviousRecordsStore
