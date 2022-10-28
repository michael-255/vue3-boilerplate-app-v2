<script setup lang="ts">
import { QHeader, QToolbar, QToolbarTitle } from 'quasar'
import { AppString } from '@/constants/ui/string-enums'
</script>

<template>
  <QHeader elevated>
    <QToolbar>
      <QToolbarTitle>{{ AppString.APP_NAME }}</QToolbarTitle>
    </QToolbar>
  </QHeader>
</template>
