<script setup lang="ts">
import { QCardSection } from 'quasar'
import SettingToggles from '@/components/settings/inputs/SettingToggles.vue'
import TestLogsBtn from '@/components/settings/buttons/TestLogsBtn.vue'
</script>

<template>
  <QCardSection>
    <div class="text-h6 q-mb-sm">Options</div>

    <div class="q-mb-sm">
      <span>Dark Mode allows you to switch between a light or dark themed app.</span>
      <span>
        Show Console Logs will display all log messages in the developer console when turned on.
      </span>
      <span>Show Debug Messages will display debug level notification alerts when on.</span>
      <span>
        Save Info Messages will save info level messages in the logs table of the database for later
        review.
      </span>
    </div>

    <SettingToggles />

    <TestLogsBtn class="q-mt-sm" />
  </QCardSection>
</template>
