<script setup lang="ts">
import { useQuasar, QToggle } from 'quasar'
import { computed } from 'vue'
import { AppTable, SettingKey } from '@/constants/core/data-enums'
import { DB } from '@/services/LocalDatabase'
import useSettingsStore from '@/stores/settings'

const $q = useQuasar()
const settingsStore = useSettingsStore()

const darkMode = computed({
  get() {
    return settingsStore.darkMode
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.DARK_MODE, { settingValue: bool })
    settingsStore.darkMode = !!bool
    $q.dark.set(bool)
  },
})

const showConsoleLogs = computed({
  get() {
    return settingsStore.showConsoleLogs
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.SHOW_CONSOLE_LOGS, { settingValue: bool })
    settingsStore.showConsoleLogs = !!bool
  },
})

const showDebugMessages = computed({
  get() {
    return settingsStore.showDebugMessages
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.SHOW_DEBUG_MESSAGES, { settingValue: bool })
    settingsStore.showDebugMessages = !!bool
  },
})

const saveInfoMessages = computed({
  get() {
    return settingsStore.saveInfoMessages
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.SAVE_INFO_MESSAGES, { settingValue: bool })
    settingsStore.saveInfoMessages = !!bool
  },
})
</script>

<template>
  <div>
    <QToggle v-model="darkMode" label="Dark Mode" />
  </div>

  <div>
    <QToggle v-model="showConsoleLogs" label="Show Console Logs" />
  </div>
  <div>
    <QToggle v-model="showDebugMessages" label="Show Debug Messages" />
  </div>
  <div>
    <QToggle v-model="saveInfoMessages" label="Save Info Messages" />
  </div>
</template>
