<script setup lang="ts">
import { QPage } from 'quasar'
import MeasurementCard from '@/components/view/measurements/MeasurementCard.vue'

/**
 * @todo Logic for getting data for MeasurementCard.vue components list...
 */
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-center">
      <div v-for="i in 16" :key="i" class="col-md-6 col-sm-8 col-xs-12">
        <MeasurementCard />
      </div>
    </div>
  </QPage>
</template>
