<script setup lang="ts">
import { QLayout, QPageContainer } from 'quasar'
import ActiveHeader from '@/components/layout/active/ActiveHeader.vue'
</script>

<template>
  <QLayout elevated view="hHh LpR lff">
    <ActiveHeader />

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
