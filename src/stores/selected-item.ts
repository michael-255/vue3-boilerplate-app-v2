import type { DataObject } from '@/constants/types-interfaces'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * PageTable currently selected item.
 */
const useSelectedItemStore: StoreDefinition = defineStore({
  id: 'selected-item',

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

  actions: {
    setItem(item: DataObject): void {
      this.item = Object.assign({}, this.item, item)
    },
  },
})

export default useSelectedItemStore
