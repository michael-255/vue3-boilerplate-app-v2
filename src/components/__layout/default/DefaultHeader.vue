<script setup lang="ts">
import { QBtn, QHeader, QToolbar, QToolbarTitle } from 'quasar'
import { useRouter } from 'vue-router'
import { RouteName } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'

const router = useRouter()
</script>

<template>
  <QHeader bordered class="bg-primary text-white">
    <QToolbar>
      <QBtn
        dense
        flat
        round
        :icon="Icon.HOME"
        @click="router.push({ name: RouteName.DASHBOARD })"
      />

      <QToolbarTitle>Back to Dashboard</QToolbarTitle>
    </QToolbar>
  </QHeader>
</template>
