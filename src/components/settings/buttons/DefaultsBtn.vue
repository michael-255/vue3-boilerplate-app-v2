<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/core/data-enums'
import { uuid } from '@/utils/common'
import { MeasurementRecord } from '@/models/MeasurementRecord'
import defaultMeasurements from '@/constants/data/default-measurements'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

function onDefaults(): void {
  confirmDialog(
    'Load Defaults',
    'Load default entires into appropriate tables in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await loadDefaults()
      } catch (error) {
        log.error('DefaultsBtn:onDefaults', error)
      }
    }
  )
}

async function loadDefaults(): Promise<void> {
  await Promise.all([
    DB.bulkAdd(AppTable.MEASUREMENTS, defaultMeasurements),
    DB.bulkAdd(AppTable.MEASUREMENT_RECORDS, makeDefaultMeasurementRecords()),
  ])
}

/**
 * @deprecate
 */
function makeDefaultMeasurementRecords(): MeasurementRecord[] {
  let date = new Date('2022/01/01')
  const defaultMeasurementRecords: MeasurementRecord[] = []

  defaultMeasurements.forEach((measurement: any) => {
    // Inner loop to make many records per measurement type
    for (let i = 0; i < 20; i++) {
      defaultMeasurementRecords.push(
        new MeasurementRecord({
          id: uuid(),
          createdDate: date.toISOString(),
          parentId: measurement.id,
          measurementValue: Number(Math.random().toString(10).substring(2, 3)) + 5 + i,
        })
      )

      // Increment the date by 1 day each iteration
      date = new Date(date.setDate(date.getDate() + 1))
    }
  })

  return defaultMeasurementRecords
}
</script>

<template>
  <QBtn label="Load Defaults" color="primary" @click="onDefaults()" />
</template>
