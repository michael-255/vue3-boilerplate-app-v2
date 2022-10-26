<script setup lang="ts">
import { QCardSection, QBtn } from 'quasar'
import { RouteName } from '@/constants/ui/routing-enums'
</script>

<template>
  <QCardSection>
    <div>
      <div class="text-h6 q-mb-sm">Logs & Settings Viewer</div>

      <div class="q-mb-md">View your app logs and settings data tables to troubleshoot errors.</div>

      <QBtn
        label="View Logs & Settings"
        color="primary"
        :to="{ name: RouteName.LOGS_AND_SETTINGS_DATA }"
      />
    </div>
  </QCardSection>
</template>
