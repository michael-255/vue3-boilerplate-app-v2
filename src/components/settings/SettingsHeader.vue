<script setup lang="ts">
import { QIcon, QCardSection } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <QCardSection class="bg-primary text-white q-py-sm text-h5">
    <QIcon class="q-pb-xs q-pr-sm" :name="Icon.SETTINGS" />
    Settings
  </QCardSection>
</template>
