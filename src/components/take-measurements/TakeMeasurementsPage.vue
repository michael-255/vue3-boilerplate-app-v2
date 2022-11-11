<script setup lang="ts">
import { QPage } from 'quasar'
import TakeMeasurementsList from '@/components/take-measurements/TakeMeasurementsList.vue'
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <TakeMeasurementsList />
    </div>
  </QPage>
</template>
