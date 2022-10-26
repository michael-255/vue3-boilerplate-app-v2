<script setup lang="ts">
import { QLayout, QPageContainer } from 'quasar'
import MenuHeader from '@/components/layout/menu/MenuHeader.vue'
import MenuDrawer from '@/components/layout/menu/MenuDrawer.vue'
</script>

<template>
  <QLayout view="hHh LpR lff">
    <MenuHeader />
    <MenuDrawer />

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
