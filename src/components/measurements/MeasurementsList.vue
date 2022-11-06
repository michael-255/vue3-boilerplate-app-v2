<script setup lang="ts">
import { onMounted } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { AppTable } from '@/constants/core/data-enums'
import useTakeMeasurementsStore from '@/stores/take-measurements'
import useOperationDialogStore from '@/stores/operation-dialog'
import MeasurementCard from '@/components/measurements/MeasurementCard.vue'
import OperationDialog from '@/components/shared/OperationDialog.vue'

const { log } = useLogger()
const takeMeasurementsStore = useTakeMeasurementsStore()
const operationDialogStore = useOperationDialogStore()

onMounted(async () => {
  operationDialogStore.table = AppTable.MEASUREMENTS
  await updateCards()
})

async function updateCards(): Promise<void> {
  try {
    takeMeasurementsStore.measurementCards = await DB.getMeasurementCards()
  } catch (error) {
    log.error('MeasurementsList:updateCards', error)
  }
}
</script>

<template>
  <div
    v-for="measurementCard in takeMeasurementsStore.measurementCards"
    :key="measurementCard.id"
    class="col-md-4 col-sm-6 col-xs-12"
  >
    <MeasurementCard :measurementCard="measurementCard" />
  </div>

  <OperationDialog @on-close-dialog="updateCards()" />
</template>
