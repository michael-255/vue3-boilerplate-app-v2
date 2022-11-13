<script setup lang="ts">
import { onMounted } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import useTakeMeasurementsStore from '@/stores/take-measurements'
import TakeMeasurementCard from '@/components/take-measurements/TakeMeasurementCard.vue'

const { log } = useLogger()
const takeMeasurementsStore = useTakeMeasurementsStore()

onMounted(async () => {
  try {
    await takeMeasurementsStore.updateMeasurementCards(DB)
  } catch (error) {
    log.error('TakeMeasurementsList:onMounted', error)
  }
})
</script>

<template>
  <div
    v-for="measurementCard in takeMeasurementsStore.measurementCards"
    :key="measurementCard.id"
    class="col-md-4 col-sm-6 col-xs-12"
  >
    <TakeMeasurementCard :measurementCard="measurementCard" />
  </div>
</template>
