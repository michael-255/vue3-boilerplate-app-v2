<script setup lang="ts">
import { QCard, QCardSection } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { AppString } from '@/constants/ui/string-enums'
import { RouteName } from '@/constants/ui/routing-enums'
import DefaultsBtn from '@/components/settings/buttons/DefaultsBtn.vue'
import TestLogsBtn from '@/components/settings/buttons/TestLogsBtn.vue'
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

    <QCardSection>
      <div>
        <TestLogsBtn />
      </div>

      <div class="q-mt-md">
        <DefaultsBtn />
      </div>

      <div class="q-mt-md">
        <QBtn
          color="positive"
          :to="{ name: RouteName.TAKE_MEASUREMENTS }"
          :icon="Icon.MEASUREMENTS"
          label="Take Measurements"
        />
      </div>

      <div class="q-mt-md">
        <QBtn
          color="positive"
          :to="{ name: RouteName.ACTIVE }"
          :icon="Icon.ACTIVITIES"
          label="Track Activity"
        />
      </div>
    </QCardSection>
  </QCard>
</template>
