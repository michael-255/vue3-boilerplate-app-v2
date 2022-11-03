<script setup lang="ts">
import { QPage } from 'quasar'
import SettingsHeader from '@/components/view/settings/SettingsHeader.vue'
import OptionsSection from '@/components/view/settings/OptionsSection.vue'
import DefaultsSection from '@/components/view/settings/DefaultsSection.vue'
import ImportExportSection from '@/components/view/settings/ImportExportSection.vue'
import DangerZoneSection from '@/components/view/settings/DangerZoneSection.vue'
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
