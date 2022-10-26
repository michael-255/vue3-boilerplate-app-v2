<script setup lang="ts">
import { QCard, QCardSection } from 'quasar'
import DefaultsBtn from '@/components/view/settings/buttons/DefaultsBtn.vue'
import TestLogsBtn from '@/components/view/settings/buttons/TestLogsBtn.vue'
</script>

<template>
  <QCard>
    <QCardSection class="bg-primary text-white text-h3">Dashboard</QCardSection>

    <QCardSection>
      This is a Vue 3 Typescript Boilerplate web app. It has basic data table and routing setup out
      of the box. Look through the code and README to get an understanding of how it is organized.
    </QCardSection>

    <QCardSection>
      The app settings are located at the right side of the nav bar and the menu is located at the
      left side of the nav bar.
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
</template>
