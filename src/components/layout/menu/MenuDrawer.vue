<script setup lang="ts">
import { QDrawer, QList } from 'quasar'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
import DrawerItem from '@/components/layout/menu/DrawerItem.vue'
import useMainMenuStore from '@/stores/main-menu'

const mainMenuStore = useMainMenuStore()
</script>

<template>
  <QDrawer v-model="mainMenuStore.drawer" :width="250" show-if-above side="left" bordered>
    <QList>
      <QItem>
        <QItemSection class="text-h6">Menu</QItemSection>
      </QItem>

      <DrawerItem :to="{ name: RouteName.DASHBOARD }" :icon="Icon.DASHBOARD" label="Dashboard" />
      <DrawerItem :to="{ name: RouteName.SETTINGS }" :icon="Icon.SETTINGS" label="Settings" />
      <DrawerItem :to="{ name: RouteName.ABOUT }" :icon="Icon.INFO" label="About" />

      <QItem>
        <QItemSection class="text-h6">Data Tables</QItemSection>
      </QItem>

      <DrawerItem
        :to="{ name: RouteName.LOGS_AND_SETTINGS_DATA }"
        :icon="Icon.LOGS"
        label="Logs & Settings"
      />

      <DrawerItem
        :to="{ name: RouteName.MEASUREMENTS_DATA }"
        :icon="Icon.MEASUREMENTS"
        label="Measurements"
      />
    </QList>
  </QDrawer>
</template>
