<script setup lang="ts">
import { QCardSection } from 'quasar'
import SettingToggles from '@/components/view/settings/inputs/SettingToggles.vue'
import TestLogsBtn from '@/components/view/settings/buttons/TestLogsBtn.vue'
</script>

<template>
  <QCardSection>
    <div class="text-h6 q-mb-sm">Debugging & Notifications</div>

    <div class="q-mb-sm">
      Turning on Debug Logging will cause all logs to appear in the console. Turning on View All
      Alerts will allow you to see low priority notifications on screen. Turning on Save Info Logs
      will cause informational logs to be stored in the database for later review.
    </div>

    <SettingToggles />

    <TestLogsBtn class="q-mt-sm" />
  </QCardSection>
</template>
