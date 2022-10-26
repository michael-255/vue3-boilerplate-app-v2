<script setup lang="ts">
import { QCard, QCardSection, QBtn, QInput } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { ref, type Ref } from 'vue'

const testText: Ref<string> = ref('')
</script>

<template>
  <QCard>
    <QCardSection class="q-pt-sm">
      <div class="text-h6">Right Forearm</div>
      <div>Wed Oct 26 2022 7:06:24 PM EDT</div>
      <div>12.3 Inches</div>

      <QInput class="q-mt-md" v-model="testText" dense outlined placeholder="Inches">
        <template v-slot:before>
          <QIcon :name="Icon.MEASUREMENTS" class="q-mr-sm" />
        </template>

        <template v-slot:after>
          <QBtn color="primary" class="q-ml-sm q-px-sm" :icon="Icon.SAVE" />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>
