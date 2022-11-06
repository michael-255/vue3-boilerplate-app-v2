<script setup lang="ts">
import { QHeader, QToolbar, QToolbarTitle } from 'quasar'
import { AppString } from '@/constants/ui/string-enums'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <QHeader elevated>
    <QToolbar>
      <QToolbarTitle>{{ AppString.APP_NAME }}</QToolbarTitle>
      <QBtn flat dense :to="{ name: RouteName.DASHBOARD }" :icon="Icon.RETURN_TO_DASHBOARD" />
    </QToolbar>
  </QHeader>
</template>
