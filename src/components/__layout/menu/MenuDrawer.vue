<script setup lang="ts">
import { QDrawer, QList, QSeparator } from 'quasar'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
import DrawerItem from '@/components/__layout/menu/DrawerItem.vue'
import useMainMenuStore from '@/stores/main-menu'

const mainMenuStore = useMainMenuStore()
</script>

<template>
  <QDrawer v-model="mainMenuStore.drawer" :width="220" show-if-above side="left" bordered>
    <QList>
      <DrawerItem :to="{ name: RouteName.DASHBOARD }" :icon="Icon.DASHBOARD" label="Dashboard" />

      <QSeparator />

      <DrawerItem
        :to="{ name: RouteName.MEASUREMENTS_DATA }"
        :icon="Icon.MEASUREMENTS"
        label="Measurements"
      />

      <QSeparator />

      <DrawerItem :to="{ name: RouteName.ABOUT }" :icon="Icon.INFO" label="About" />
    </QList>
  </QDrawer>
</template>
