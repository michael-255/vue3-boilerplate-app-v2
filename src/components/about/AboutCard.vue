<script setup lang="ts">
import { QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Links } from '@/constants/ui/routing-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { AppString } from '@/constants/ui/string-enums'
</script>

<template>
  <QCard>
    <QCardSection class="bg-primary text-white q-py-sm text-h5">
      <QIcon class="q-pb-xs q-pr-sm" :name="Icon.INFO" />
      About
    </QCardSection>

    <QCardSection>
      {{ AppString.APP_NAME }} is a Vue 3 Typescript project created by michael-255 on GitHub
    </QCardSection>

    <QCardActions align="left">
      <QBtn
        class="q-my-sm"
        color="primary"
        label="GitHub"
        target="_blank"
        :href="Links.GITHUB"
        :icon="Icon.CODE"
      />

      <QBtn
        disable
        color="primary"
        label="My Apps"
        target="_blank"
        :href="Links.MYAPPS"
        :icon="Icon.WEB"
      />
    </QCardActions>
  </QCard>
</template>
