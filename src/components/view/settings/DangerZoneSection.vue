<script setup lang="ts">
import { QCardSection } from 'quasar'
import ClearAllBtn from '@/components/view/settings/buttons/ClearAllBtn.vue'
import DeleteDBBtn from '@/components/view/settings/buttons/DeleteDBBtn.vue'
</script>

<template>
  <QCardSection>
    <div>
      <div class="text-h6 q-mb-sm">DANGER ZONE</div>

      <div class="q-mb-md">
        Permanetly delete all of your app data or delete the underling Dexie database. This action
        cannot be undone. Export your data if you intend to use it later.
      </div>

      <div>
        <ClearAllBtn />
      </div>
      <div class="q-mt-md">
        <DeleteDBBtn />
      </div>
    </div>
  </QCardSection>
</template>
