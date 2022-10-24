import { Field } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * State of input component validation.
 */
const useValidateItemStore: StoreDefinition = defineStore({
  id: 'validate-item',

  /**
   * We assume that each field is valid by default since defaulted input values (Create) and
   * selected item values (Update) should always be valid.
   */
  state: () => ({
    item: Object.values(Field).reduce((o, field) => ({ ...o, [field]: null }), {}),
  }),

  getters: {
    areItemFieldsValid:
      (state: any) =>
      (fields: Field[]): boolean => {
        return fields.every((field: Field) => state.item[field] === true)
      },
  },
})

export default useValidateItemStore
