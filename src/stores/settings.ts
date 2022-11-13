import { AppTable, Field, SettingKey } from '@/constants/core/data-enums'
import type { DatabaseObject } from '@/constants/types-interfaces'
import type { Setting } from '@/models/__Setting'
import type { LocalDatabase } from '@/services/LocalDatabase'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Manages state for all app settings.
 */
const useSettingsStore: StoreDefinition = defineStore({
  id: 'settings',

  state: () => ({
    // The real defaults for these are set in the initSettings action
    darkMode: false,
    showConsoleLogs: false,
    showDebugMessages: false,
    saveInfoMessages: false,
  }),

  actions: {
    /**
     * Call this to check the DB for settings and/or initialize the default settings state.
     * @param database
     */
    async initSettings(database: LocalDatabase): Promise<void> {
      const settings = (await database.getAll(AppTable.SETTINGS)) as Setting[]

      let darkModeValue = settings.find(
        (setting: DatabaseObject) => setting[Field.ID] === SettingKey.DARK_MODE
      )?.settingValue

      let showConsoleLogsValue = settings.find(
        (setting: DatabaseObject) => setting[Field.ID] === SettingKey.SHOW_CONSOLE_LOGS
      )?.settingValue

      let showDebugMessagesValue = settings.find(
        (setting: DatabaseObject) => setting[Field.ID] === SettingKey.SHOW_DEBUG_MESSAGES
      )?.settingValue

      let saveInfoMessagesValue = settings.find(
        (setting: DatabaseObject) => setting[Field.ID] === SettingKey.SAVE_INFO_MESSAGES
      )?.settingValue

      // Create the Setting records with a default value if it doesn't exist
      if (darkModeValue === undefined) {
        darkModeValue = true // default

        await database.add(AppTable.SETTINGS, {
          id: SettingKey.DARK_MODE,
          createdDate: new Date().toISOString(),
          settingValue: darkModeValue,
        })
      }

      if (showConsoleLogsValue === undefined) {
        showConsoleLogsValue = false // default

        await database.add(AppTable.SETTINGS, {
          id: SettingKey.SHOW_CONSOLE_LOGS,
          createdDate: new Date().toISOString(),
          settingValue: showConsoleLogsValue,
        })
      }

      if (showDebugMessagesValue === undefined) {
        showDebugMessagesValue = false // default

        await database.add(AppTable.SETTINGS, {
          id: SettingKey.SHOW_DEBUG_MESSAGES,
          createdDate: new Date().toISOString(),
          settingValue: showDebugMessagesValue,
        })
      }

      if (saveInfoMessagesValue === undefined) {
        saveInfoMessagesValue = false // default

        await database.add(AppTable.SETTINGS, {
          id: SettingKey.SAVE_INFO_MESSAGES,
          createdDate: new Date().toISOString(),
          settingValue: saveInfoMessagesValue,
        })
      }

      // Set the store state values
      this.darkMode = !!darkModeValue
      this.showConsoleLogs = !!showConsoleLogsValue
      this.showDebugMessages = !!showDebugMessagesValue
      this.saveInfoMessages = !!saveInfoMessagesValue
    },
  },
})

export default useSettingsStore
