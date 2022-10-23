<script setup lang="ts">
import {
  QBtn,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QDrawer,
  QPageContainer,
  QList,
  QSeparator,
} from 'quasar'
import DrawerItem from '@/components/drawer/DrawerItem.vue'
import { View, Icon, Strings } from '@/constants/ui-enums'
import useMainMenuStore from '@/stores/main-menu'

/**
 * Layout with the title, menu drawer, and settings.
 */

const mainMenu = useMainMenuStore()
</script>

<template>
  <QLayout view="hHh LpR lff">
    <QHeader elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round :icon="Icon.MENU" @click="mainMenu.drawer = !mainMenu.drawer" />

        <QToolbarTitle>{{ Strings.APP_NAME }}</QToolbarTitle>

        <QBtn flat dense label="Settings" :to="{ name: View.SETTINGS }" :icon="Icon.SETTINGS" />
      </QToolbar>
    </QHeader>

    <QDrawer v-model="mainMenu.drawer" :width="220" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="{ name: View.DASHBOARD }" :icon="Icon.DASHBOARD" label="Dashboard" />

        <QSeparator />

        <DrawerItem
          :to="{ name: View.MEASUREMENTS_DATA }"
          :icon="Icon.MEASUREMENTS"
          label="Measurements"
        />

        <QSeparator />

        <DrawerItem :to="{ name: View.ABOUT }" :icon="Icon.INFO" label="About" />
      </QList>
    </QDrawer>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
