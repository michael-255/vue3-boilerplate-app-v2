<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { Operation } from '@/constants/core/data-enums'
import { DB } from '@/services/LocalDatabase'
import useOperationDialogStore from '@/stores/operation-dialog'
import OperationInspect from '@/components/shared/operation-dialog/OperationInspect.vue'
import OperationCreate from '@/components/shared/operation-dialog/OperationCreate.vue'
import OperationUpdate from '@/components/shared/operation-dialog/OperationUpdate.vue'
import OperationReport from '@/components/shared/operation-dialog/OperationReport.vue'

const operationDialogStore = useOperationDialogStore()
</script>

<template>
  <QDialog
    v-model="operationDialogStore.isActive"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">
          {{ operationDialogStore.title }}
        </div>
        <QSpace />
        <QBtn flat round :icon="Icon.CLOSE" @click="operationDialogStore.closeDialog(DB)" />
      </QCardActions>

      <QCardSection>
        <OperationInspect v-if="operationDialogStore.operation === Operation.INSPECT" />
        <OperationCreate v-else-if="operationDialogStore.operation === Operation.CREATE" />
        <OperationUpdate v-else-if="operationDialogStore.operation === Operation.UPDATE" />
        <OperationReport v-else-if="operationDialogStore.operation === Operation.REPORT" />
        <div v-else>TEST Selected operation is not supported</div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
