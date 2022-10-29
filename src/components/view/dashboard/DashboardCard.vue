<script setup lang="ts">
import { QCard, QCardSection } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { AppString } from '@/constants/ui/string-enums'
import DefaultsBtn from '@/components/view/settings/buttons/DefaultsBtn.vue'
import TestLogsBtn from '@/components/view/settings/buttons/TestLogsBtn.vue'
</script>

<template>
  <QCard>
    <QCardSection class="bg-primary text-white q-py-sm text-h5">
      <QIcon class="q-pb-xs q-pr-sm" :name="Icon.DASHBOARD" />
      Dashboard
    </QCardSection>

    <QCardSection>
      This is the {{ AppString.APP_NAME }}. It has basic data tables, settings, and routing setup
      out of the box. Use the menu in the top left to navigate throughout the app. Look through the
      code and README to get an understanding of how it is organized.
    </QCardSection>

    <QCardActions align="left">
      <TestLogsBtn />
      <DefaultsBtn />
    </QCardActions>
  </QCard>
</template>
