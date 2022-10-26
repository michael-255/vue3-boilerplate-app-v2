<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import useDataTableStore from '@/stores/view/data-table'

/**
 * DataTableDialog is a fullscreen dialog for views that use the DataTable components. You load
 * components needed for operations like Create, Update, and Report inside of its slot.
 */
const emits = defineEmits<{ (eventName: 'on-dialog-close'): void }>()
const dataTableStore = useDataTableStore()
</script>

<template>
  <QDialog
    v-model="dataTableStore.dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">
          {{ dataTableStore.operation }} {{ dataTableStore.itemLabel }}
        </div>
        <QSpace />
        <QBtn flat round :icon="Icon.CLOSE" @click="emits('on-dialog-close')" />
      </QCardActions>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
