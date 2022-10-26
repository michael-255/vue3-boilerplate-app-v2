<script setup lang="ts">
import { QPage } from 'quasar'
import BoilerplateMessageCard from '@/components/view/dashboard/BoilerplateMessageCard.vue'
import MeasurementsCard from '@/components/view/dashboard/MeasurementsCard.vue'
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <div class="col-12">
        <BoilerplateMessageCard />
      </div>

      <div class="col-md-4 col-sm-6 col-xs-12">
        <MeasurementsCard />
      </div>
    </div>
  </QPage>
</template>
