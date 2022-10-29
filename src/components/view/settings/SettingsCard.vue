<script setup lang="ts">
import { QIcon, QCard, QCardSection, QSeparator } from 'quasar'
import OptionsSection from './OptionsSection.vue'
import DefaultsSection from './DefaultsSection.vue'
import ImportExportSection from './ImportExportSection.vue'
import DangerZoneSection from './DangerZoneSection.vue'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <QCard>
    <QCardSection class="bg-primary text-white q-py-sm text-h5">
      <QIcon class="q-pb-xs q-pr-sm" :name="Icon.SETTINGS" />
      Settings
    </QCardSection>

    <OptionsSection />

    <QSeparator />

    <DefaultsSection />

    <QSeparator />

    <ImportExportSection />

    <QSeparator />

    <DangerZoneSection />
  </QCard>
</template>
