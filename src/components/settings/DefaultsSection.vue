<script setup lang="ts">
import { QCardSection } from 'quasar'
import DefaultsBtn from '@/components/settings/buttons/DefaultsBtn.vue'
</script>

<template>
  <QCardSection>
    <div class="text-h6 q-mb-sm">Database Defaults</div>

    <div class="q-mb-md">
      Load default data into the database that you can begin using right away.
    </div>

    <DefaultsBtn />
  </QCardSection>
</template>
