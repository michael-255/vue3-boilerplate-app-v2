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
      const id = measurement.id
      const name = measurement.name
      const measurementType = measurement.measurementType
      const previousCreatedDate = (
        (await DB.getNewestByField(
          AppTable.MEASUREMENT_RECORDS,
          Field.PARENT_ID,
          measurement.id
        )) as MeasurementRecord
      )?.createdDate as string
      const previousMeasurementValue = (
        (await DB.getNewestByField(
          AppTable.MEASUREMENT_RECORDS,
          Field.PARENT_ID,
          measurement.id
        )) as MeasurementRecord
      )?.measurementValue as number

      return {
        id,
        name,
        measurementType,
        previousCreatedDate,
        previousMeasurementValue,
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
    <div class="row q-col-gutter-md justify-center">
      <div v-for="data in cardData" :key="data.id" class="col-md-6 col-sm-8 col-xs-12">
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
