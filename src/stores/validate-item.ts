import { AppTable } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * State of input component validation.
 */
const useValidateItemStore: StoreDefinition = defineStore({
  id: 'validate-item',

  /**
   * We assume that each field is valid by default since defaulted input values (Create) and
   * selected item values (Update) should always be valid.
   * @todo Object.values(Field).reduce((o, key) => ({ ...o, [key]: null }), {})
   */
  state: () => ({
    item: {
      // Entity
      id: null,
      createdDate: null,
      // Activity
      name: null,
      // Record
      parentId: null,
      // Measurement
      measurementType: null,
      // Measurement Record
      measurementValue: null,
    },
  }),

  getters: {
    /**
     * The table item you want to validate the fields for.
     */
    tableItem:
      (state: any) =>
      (table: AppTable): boolean => {
        return {
          [AppTable.MEASUREMENTS]: state.isMeasurementValid,
          [AppTable.MEASUREMENT_RECORDS]: state.isMeasurementRecordValid,
          [AppTable.LOGS]: false,
          [AppTable.SETTINGS]: false,
        }[table]
      },

    _areEntityFieldsValid: (state: any): boolean => {
      return state.item.id && state.item.createdDate
    },

    _areActivityFieldsValid: (state: any): boolean => {
      return state.item.name && state.item.description && state.item.activityStatus
    },

    _areRecordFieldsValid: (state: any): boolean => {
      return state.item.parentId && state.item.note && state.item.recordStatus
    },

    isMeasurementValid: (state: any): boolean => {
      return (
        state._areEntityFieldsValid && state._areActivityFieldsValid && state.item.measurementType
      )
    },

    isMeasurementRecordValid: (state: any): boolean => {
      return (
        state._areEntityFieldsValid &&
        state._areRecordFieldsValid &&
        state.item.parentMeasurementType &&
        state.item.measurementValue
      )
    },
  },
})

export default useValidateItemStore
