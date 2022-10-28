<script setup lang="ts">
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import type { Measurement } from '@/models/Measurement'
import { onMounted, ref, type Ref } from 'vue'
import { QPage } from 'quasar'
import { DB } from '@/services/LocalDatabase'
import { AppTable, Field } from '@/constants/core/data-enums'
import { useLogger } from '@/use/useLogger'
import MeasurementCard from '@/components/view/measurements/MeasurementCard.vue'
import type { DatabaseObject } from '@/constants/types-interfaces'

const { log } = useLogger()
const cardData: Ref<DatabaseObject> = ref([])

onMounted(async () => {
  try {
    const measurements = (await DB.getAll(AppTable.MEASUREMENTS)).sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    }) as Measurement[]

    const promises = measurements.map(async (measurement: Measurement) => {
      // Get most recent Measurement Record (if any)
      const measurementRecord = (await DB.getNewestByField(
        AppTable.MEASUREMENT_RECORDS,
        Field.PARENT_ID,
        measurement.id
      )) as MeasurementRecord

      return {
        id: measurement.id,
        name: measurement.name,
        measurementType: measurement.measurementType,
        previousCreatedDate: measurementRecord?.createdDate || 'No previous records', // From Measurement Rccord
        previousMeasurementValue: measurementRecord?.measurementValue || 0, // From Measurement Rccord
      }
    })

    cardData.value = await Promise.all(promises)
  } catch (error) {
    log.error('MeasurementsView:onMounted', error)
  }
})
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <div v-for="data in cardData" :key="data.id" class="col-md-4 col-sm-6 col-xs-12">
        <MeasurementCard
          :name="data.name"
          :measurementType="data.measurementType"
          :previousMeasurementCreatedDate="data.previousCreatedDate"
          :previousMeasurementValue="data.previousMeasurementValue"
        />
      </div>
    </div>
  </QPage>
</template>
