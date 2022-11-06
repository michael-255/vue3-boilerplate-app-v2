<script setup lang="ts">
import { QLayout, QPageContainer, QHeader, QToolbar, QToolbarTitle } from 'quasar'
import { AppString } from '@/constants/ui/string-enums'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
</script>

<template>
  <QLayout elevated view="hHh LpR lff">
    <QHeader elevated>
      <QToolbar>
        <QToolbarTitle>{{ AppString.APP_NAME }}</QToolbarTitle>
        <QBtn flat dense :to="{ name: RouteName.DASHBOARD }" :icon="Icon.RETURN_TO_DASHBOARD" />
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
