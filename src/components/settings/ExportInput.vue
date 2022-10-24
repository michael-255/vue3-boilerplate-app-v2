<script setup lang="ts">
import { exportFile, QInput, QBtn } from 'quasar'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { AppTable } from '@/constants/core/data-enums'
import { DB } from '@/services/LocalDatabase'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'

const { log, consoleDebug } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const exportText: Ref<string> = ref('')

/**
 * Confirm if you want to export your data as a JSON file.
 */
function onExport(): void {
  let filename = `export-${new Date().toISOString().split('T')[0]}`
  if (exportText.value && exportText.value.length) {
    filename = exportText.value
  }
  filename += '.json'

  confirmDialog(
    'Export',
    `Export the file "${filename}" with your data?`,
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await confirmedFileExport(filename)
      } catch (error) {
        log.error('onExport', error)
      }
    }
  )
}

/**
 * Exports the tables listed in the function as a JSON file.
 * @param filename
 */
async function confirmedFileExport(filename: string): Promise<void> {
  // Using the table keys as a guide for what data can be exported as JSON
  const tableKeys = Object.values(AppTable)
  const tableData = await Promise.all(tableKeys.map((table) => DB.getAll(table as AppTable)))
  const appData = tableKeys.reduce((o, key, i) => ({ ...o, [key]: tableData[i] }), {})

  consoleDebug(appData)

  const fileStatus = exportFile(filename, JSON.stringify(appData), {
    encoding: 'UTF-8',
    mimeType: 'application/json',
  })

  if (fileStatus === true) {
    consoleDebug('File downloaded succesfully!')
  } else {
    throw new Error('Browser denied file download')
  }
}
</script>

<template>
  <QInput v-model="exportText" dense outlined placeholder="Optional Name">
    <template v-slot:before>
      <QBtn label="Export" color="primary" class="q-mr-xs" @click="onExport()" />
    </template>

    <template v-slot:after>
      <QIcon :name="Icon.CLOSE" @click.stop="exportText = ''" class="cursor-pointer" />
    </template>
  </QInput>
</template>
