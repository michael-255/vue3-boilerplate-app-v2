<script setup lang="ts">
import { QCard, QCardSection } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <!-- Temporary example as part of the Boilerplate App -->
  <QPage padding>
    <div class="row justify-center">
      <div class="col-12">
        <QCard>
          <QCardSection class="bg-dark text-white q-py-sm text-h5">
            <QIcon class="q-pb-xs q-pr-sm" :name="Icon.ACTIVITIES" />
            Activity Tracker
          </QCardSection>
        </QCard>
      </div>
    </div>
  </QPage>
</template>
