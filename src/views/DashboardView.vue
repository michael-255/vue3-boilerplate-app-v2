<script setup lang="ts">
import { QBtn, QCard, QCardSection } from 'quasar'
import DefaultsBtn from '@/components/settings/DefaultsBtn.vue'
import TestLogsBtn from '@/components/settings/TestLogsBtn.vue'
</script>

<template>
  <div class="row q-col-gutter-md justify-start">
    <div class="col-12">
      <QCard>
        <QCardSection class="bg-primary text-white text-h3">Dashboard</QCardSection>

        <QCardSection>
          This is a Vue 3 Typescript Boilerplate web app. It has basic data table and routing setup
          out of the box. Look through the code and README to get an understanding of how it is
          organized.
        </QCardSection>

        <QCardSection>
          The app settings are located at the right side of the nav bar and the menu is located at
          the left side of the nav bar.
        </QCardSection>

        <QCardSection>
          You can generate test logs that you can view by navigating to the settings and you can
          generate mock example records that you can view by navigating to the menu.
        </QCardSection>

        <QCardActions align="left">
          <TestLogsBtn />
          <DefaultsBtn />
        </QCardActions>
      </QCard>
    </div>

    <div v-for="i in 5" :key="i" class="col-md-4 col-sm-6 col-xs-12">
      <QCard>
        <QCardActions align="left">
          <QBtn icon="straighten" class="full-width" color="positive"> Take Measurements </QBtn>
        </QCardActions>
      </QCard>
    </div>
  </div>
</template>
