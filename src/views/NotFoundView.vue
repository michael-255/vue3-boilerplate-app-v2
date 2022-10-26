<script setup lang="ts">
import { QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <div class="row justify-center">
    <div class="col-md-4 col-sm-5 col-xs-12">
      <QCard>
        <QCardSection class="bg-negative text-white">
          <div class="text-h3">404</div>
          <div class="text-subtitle1">Page Not Found</div>
        </QCardSection>

        <QCardActions align="left">
          <QBtn
            flat
            :to="{ name: RouteName.DASHBOARD }"
            :icon="Icon.UNDO"
            label="Return to Dashboard"
          />
        </QCardActions>
      </QCard>
    </div>
  </div>
</template>
