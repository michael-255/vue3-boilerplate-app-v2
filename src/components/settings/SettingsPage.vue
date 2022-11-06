<script setup lang="ts">
import { QPage } from 'quasar'
import SettingsHeader from '@/components/settings/SettingsHeader.vue'
import OptionsSection from '@/components/settings/OptionsSection.vue'
import DefaultsSection from '@/components/settings/DefaultsSection.vue'
import ImportExportSection from '@/components/settings/ImportExportSection.vue'
import DangerZoneSection from '@/components/settings/DangerZoneSection.vue'
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <div class="col-12">
        <QCard>
          <SettingsHeader />

          <OptionsSection />

          <QSeparator />

          <DefaultsSection />

          <QSeparator />

          <ImportExportSection />

          <QSeparator />

          <DangerZoneSection />
        </QCard>
      </div>
    </div>
  </QPage>
</template>
