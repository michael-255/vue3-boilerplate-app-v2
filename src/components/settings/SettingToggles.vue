<script setup lang="ts">
import { QToggle } from 'quasar'
import { computed } from 'vue'
import { AppTable, SettingKey } from '@/constants/core/data-enums'
import { DB } from '@/services/LocalDatabase'
import useSettingsStore from '@/stores/settings'

const settingsStore = useSettingsStore()

const DEBUG = computed({
  get() {
    return settingsStore.DEBUG
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.DEBUG, { settingValue: bool })
    settingsStore.setDEBUG(bool)
  },
})

const NOTIFY = computed({
  get() {
    return settingsStore.NOTIFY
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.NOTIFY, { settingValue: bool })
    settingsStore.setNOTIFY(bool)
  },
})

const INFO = computed({
  get() {
    return settingsStore.INFO
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.INFO, { settingValue: bool })
    settingsStore.setINFO(bool)
  },
})
</script>

<template>
  <div>
    <QToggle v-model="DEBUG" label="Debug Logging" />
  </div>
  <div>
    <QToggle v-model="NOTIFY" label="View All Alerts" />
  </div>
  <div>
    <QToggle v-model="INFO" label="Save Info Logs" />
  </div>
</template>
