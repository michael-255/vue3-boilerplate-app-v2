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
  QPage,
} from 'quasar'
import DrawerItem from '@/components/drawer/DrawerItem.vue'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { AppString } from '@/constants/ui/string-enums'
import useMainMenuStore from '@/stores/main-menu'

/**
 * Layout with the title, menu drawer, and settings.
 */

const mainMenuStore = useMainMenuStore()
</script>

<template>
  <QLayout view="hHh LpR lff">
    <QHeader elevated class="bg-primary text-white">
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

    <QPageContainer>
      <QPage padding>
        <router-view />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
