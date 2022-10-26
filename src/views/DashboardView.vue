<script setup lang="ts">
import { QBtn, QCard, QPage } from 'quasar'
import BoilerplateMessageCard from '@/components/view/dashboard/BoilerplateMessageCard.vue'
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <div class="col-12">
        <BoilerplateMessageCard />
      </div>

      <div v-for="i in 5" :key="i" class="col-md-4 col-sm-6 col-xs-12">
        <QCard>
          <QCardActions align="left">
            <QBtn icon="straighten" class="full-width" color="positive"> Take Measurements </QBtn>
          </QCardActions>
        </QCard>
      </div>
    </div>
  </QPage>
</template>
