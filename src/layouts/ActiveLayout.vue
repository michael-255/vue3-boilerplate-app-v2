<script setup lang="ts">
import { QLayout, QPageContainer } from 'quasar'
</script>

<template>
  <QLayout elevated view="hHh LpR lff">
    <!-- @todo - Make ActiveHeader, TimerFooter -->

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
