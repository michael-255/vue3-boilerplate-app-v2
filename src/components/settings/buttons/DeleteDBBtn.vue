<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { DB } from '@/services/LocalDatabase'

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()

/**
 * Deletes the underling Dexie Database. This removes all data, and will require a website reload.
 */
async function onDeleteDB(): Promise<void> {
  confirmDialog(
    'Delete Database',
    'Delete the underlining Dexie database? This only needs to be done to correct schema changes in newer versions of the app. All data will be lost.',
    Icon.DELETE,
    NotifyColor.ERROR,
    async (): Promise<void> => {
      try {
        await DB.deleteDatabase()
        reloadMessageDialog()
      } catch (error) {
        log.error('DeleteDBBtn:onDeleteDB', error)
      }
    }
  )
}

function reloadMessageDialog(): void {
  dismissDialog('Reload Reminder', 'Please reload the website now.', Icon.INFO, NotifyColor.INFO)
}
</script>

<template>
  <QBtn label="Delete Database" :color="NotifyColor.ERROR" @click="onDeleteDB()" />
</template>
