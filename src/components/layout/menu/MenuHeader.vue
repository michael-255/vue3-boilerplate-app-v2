<script setup lang="ts">
import { QBtn, QHeader, QToolbar, QToolbarTitle } from 'quasar'
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

      <!-- <QBtn flat dense :to="{ name: RouteName.DASHBOARD }" :icon="Icon.RETURN_TO_DASHBOARD" /> -->
    </QToolbar>
  </QHeader>
</template>
