<script setup lang="ts">
import { QLayout, QPageContainer } from 'quasar'
import DefaultHeader from '@/components/layout/default/DefaultHeader.vue'
</script>

<template>
  <QLayout elevated view="hHh LpR lff">
    <DefaultHeader />

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
