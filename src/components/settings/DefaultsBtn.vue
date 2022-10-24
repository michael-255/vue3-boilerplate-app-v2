<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import defaultMeasurements from '@/constants/data/default-measurements.json'
import legacyRecords from '@/constants/data/legacy-records.json'

const { log, consoleDebug } = useLogger()
const { confirmDialog } = useSimpleDialogs()

/**
 * Confirm if you want to load defaults into your tables.
 */
function onDefaults(): void {
  confirmDialog(
    'Load Defaults',
    'Load default entires into appropriate tables in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        loadDefaults()
      } catch (error) {
        log.error('onDefaults', error)
      }
    }
  )
}

async function loadDefaults() {
  const appData = {
    exercises: defaultExercises || [],
    exerciseRecords: legacyRecords.exerciseRecords || [], // TEMP
    measurements: defaultMeasurements || [],
    measurementRecords: legacyRecords.measurementRecords || [], // TEMP
    workouts: defaultWorkouts || [],
    workoutRecords: legacyRecords.workoutRecords || [], // TEMP
    logs: [], // No reason to default these
    settings: [], // No reason to default these
  }

  consoleDebug(appData)

  await Promise.all([
    DB.bulkAdd(AppTable.MEASUREMENTS, appData?.measurements),
    DB.bulkAdd(AppTable.MEASUREMENT_RECORDS, appData?.measurementRecords),
    // Logs and Settings are NOT added
  ])
}
</script>

<template>
  <QBtn label="Load Defaults" color="primary" @click="onDefaults()" />
</template>
