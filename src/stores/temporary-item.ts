import { defineStore, type StoreDefinition } from 'pinia'

/**
 * PageTable in temporary progress item used for creates and updates.
 */
const useTemporaryItemStore: StoreDefinition = defineStore({
  id: 'temporary-item',

  state: () => ({
    item: {
      id: null,
      createdDate: null,
      name: null,
      description: null,
      activityStatus: null,
      parentId: null,
      note: null,
      recordStatus: null,
      finishedDate: null,
      exerciseTracks: null,
      weight: null,
      reps: null,
      distance: null,
      duration: null,
      measurementType: null,
      parentMeasurementType: null,
      measurementValue: null,
      exerciseIds: null,
      exerciseRecordIds: null,
    },
  }),
})

export default useTemporaryItemStore
