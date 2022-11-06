<script setup lang="ts">
import { QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <QCard>
    <QCardSection>
      <div class="text-h6">Take Measurements</div>
    </QCardSection>

    <QCardActions align="left">
      <QBtn
        color="positive"
        class="full-width"
        :to="{ name: RouteName.TAKE_MEASUREMENTS }"
        :icon="Icon.MEASUREMENTS"
        label="Take Measurements"
      />
    </QCardActions>
  </QCard>
</template>
