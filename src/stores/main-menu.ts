import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Tracks state for the MenuLayout.
 */
const useMainMenuStore: StoreDefinition = defineStore({
  id: 'main-menu',

  state: () => ({
    drawer: false,
  }),
})

export default useMainMenuStore
