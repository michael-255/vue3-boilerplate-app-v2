<script setup lang="ts">
import { QCardSection } from 'quasar'
import ImportInput from '@/components/__view/settings/inputs/ImportInput.vue'
import ExportInput from '@/components/__view/settings/inputs/ExportInput.vue'
</script>

<template>
  <QCardSection>
    <div class="text-h6 q-mb-sm">Import & Export</div>

    <div class="q-mb-md">You can import data into the app database from a JSON file.</div>
    <ImportInput />

    <div class="q-mb-md">You can export the entire app database as a JSON file.</div>
    <ExportInput />
  </QCardSection>
</template>
