<script setup lang="ts">
import { QCardSection } from 'quasar'
import ClearAllBtn from '@/components/settings/buttons/ClearAllBtn.vue'
import DeleteDBBtn from '@/components/settings/buttons/DeleteDBBtn.vue'
</script>

<template>
  <QCardSection>
    <div>
      <div class="text-h6 q-mb-sm">DANGER ZONE</div>

      <div class="q-mb-md">
        <span>Permanetly delete all of your data from the database using Clear All.</span>
        <span>
          Permanetly delete your data and the underlining database using Delete Database (requires
          site reload).
        </span>
        <span>
          None of the actions in this section can be undone. Export your data before proceeding.
        </span>
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
