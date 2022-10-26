<script setup lang="ts">
import { QCard, QCardSection, QSeparator } from 'quasar'
import DebugNotifySection from './DebugNotifySection.vue'
import DefaultsSection from './DefaultsSection.vue'
import ImportExportSection from './ImportExportSection.vue'
import LogsSettingsSection from './LogsSettingsSection.vue'
import DangerZoneSection from './DangerZoneSection.vue'
</script>

<template>
  <QCard>
    <QCardSection class="bg-primary text-white">
      <div class="text-h3">Settings</div>
    </QCardSection>

    <DebugNotifySection />

    <QSeparator />

    <DefaultsSection />

    <QSeparator />

    <ImportExportSection />

    <QSeparator />

    <LogsSettingsSection />

    <QSeparator />

    <DangerZoneSection />
  </QCard>
</template>
