<script setup lang="ts">
import { QLayout, QPageContainer, QHeader, QToolbar, QToolbarTitle } from 'quasar'
import { AppString } from '@/constants/ui/string-enums'
</script>

<template>
  <QLayout elevated view="hHh LpR lff">
    <QHeader elevated>
      <QToolbar>
        <QToolbarTitle>{{ AppString.APP_NAME }}</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
