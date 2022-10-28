<script setup lang="ts">
import { QBtn, QHeader, QToolbar, QToolbarTitle } from 'quasar'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { AppString } from '@/constants/ui/string-enums'
import useMainMenuStore from '@/stores/main-menu'

const mainMenuStore = useMainMenuStore()
</script>

<template>
  <QHeader elevated>
    <QToolbar>
      <QBtn
        dense
        flat
        round
        :icon="Icon.MENU"
        @click="mainMenuStore.drawer = !mainMenuStore.drawer"
      />

      <QToolbarTitle>{{ AppString.APP_NAME }}</QToolbarTitle>

      <QBtn flat round :to="{ name: RouteName.SETTINGS }" :icon="Icon.SETTINGS" />
    </QToolbar>
  </QHeader>
</template>
