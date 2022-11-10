<script setup lang="ts">
import { onMounted } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import useTakeMeasurementsStore from '@/stores/take-measurements'
import MeasurementCard from '@/components/measurements/MeasurementCard.vue'

const { log } = useLogger()
const takeMeasurementsStore = useTakeMeasurementsStore()

onMounted(async () => {
  try {
    takeMeasurementsStore.measurementCards = await DB.getMeasurementCards()
  } catch (error) {
    log.error('MeasurementsList:onMounted', error)
  }
})
</script>

<template>
  <div
    v-for="measurementCard in takeMeasurementsStore.measurementCards"
    :key="measurementCard.id"
    class="col-md-4 col-sm-6 col-xs-12"
  >
    <MeasurementCard :measurementCard="measurementCard" />
  </div>
</template>
