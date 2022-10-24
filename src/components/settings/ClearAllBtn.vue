<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { AppTable } from '@/constants/core/data-enums'
import { DB } from '@/services/LocalDatabase'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import useSettingsStore from '@/stores/settings'

const settings = useSettingsStore()
const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

/**
 * Removes all data from all databases defined in the AppTable enum.
 */
async function onClearAll(): Promise<void> {
  confirmDialog(
    'Clear All',
    'Permanetly remove all app data from the database?',
    Icon.DELETE,
    NotifyColor.ERROR,
    async (): Promise<void> => {
      try {
        await Promise.all(Object.values(AppTable).map((table) => DB.clear(table as AppTable)))
        await DB.initDatabaseSettings() // Default settings after clear finishes
        settings.setDEBUG(false)
        settings.setNOTIFY(false)
        settings.setINFO(false)
      } catch (error) {
        log.error('onClearAll', error)
      }
    }
  )
}
</script>

<template>
  <QBtn label="Clear All" :color="NotifyColor.ERROR" @click="onClearAll()" />
</template>
