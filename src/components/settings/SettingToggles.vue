<script setup lang="ts">
import { QToggle } from 'quasar'
import useSettingsStore from '@/stores/settings'
import { computed } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { AppTable, SettingKey } from '@/constants/data-enums'

const settings = useSettingsStore()

const DEBUG = computed({
  get() {
    return settings.DEBUG
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.DEBUG, { settingValue: bool })
    settings.setDEBUG(bool)
  },
})

const NOTIFY = computed({
  get() {
    return settings.NOTIFY
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.NOTIFY, { settingValue: bool })
    settings.setNOTIFY(bool)
  },
})

const INFO = computed({
  get() {
    return settings.INFO
  },
  async set(bool: boolean) {
    await DB.updateById(AppTable.SETTINGS, SettingKey.INFO, { settingValue: bool })
    settings.setINFO(bool)
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
