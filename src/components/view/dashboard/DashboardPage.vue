<script setup lang="ts">
import { QPage } from 'quasar'
import MessageCard from './MessageCard.vue'
import TakeMeasurementsCard from './TakeMeasurementsCard.vue'
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <div class="col-12">
        <MessageCard />
      </div>

      <div class="col-md-4 col-sm-6 col-xs-12">
        <TakeMeasurementsCard />
      </div>
    </div>
  </QPage>
</template>
