<script setup lang="ts">
import { QPage } from 'quasar'
import DashboardCard from '@/components/view/dashboard/DashboardCard.vue'
import MeasurementsCard from '@/components/view/dashboard/MeasurementsCard.vue'
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <div class="col-12">
        <DashboardCard />
      </div>

      <div class="col-md-4 col-sm-6 col-xs-12">
        <MeasurementsCard />
      </div>
    </div>
  </QPage>
</template>
