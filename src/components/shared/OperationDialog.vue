<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { Operation } from '@/constants/core/data-enums'
import { useOperationDialog } from '@/use/useOperationDialog'
import useOperationDialogStore from '@/stores/operation-dialog'
import OperationInspect from '@/components/shared/operation-dialog/OperationInspect.vue'
import OperationCreate from '@/components/shared/operation-dialog/OperationCreate.vue'
import OperationUpdate from '@/components/shared/operation-dialog/OperationUpdate.vue'
import OperationReport from '@/components/shared/operation-dialog/OperationReport.vue'

const { onCloseOperationDialog } = useOperationDialog()
const operationDialogStore = useOperationDialogStore()
</script>

<template>
  <QDialog
    v-model="operationDialogStore.dialog.isActive"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">
          {{ operationDialogStore.dialog.title }}
        </div>
        <QSpace />
        <QBtn flat round :icon="Icon.CLOSE" @click="onCloseOperationDialog()" />
      </QCardActions>

      <QCardSection>
        <OperationInspect v-if="operationDialogStore.dialog.operation === Operation.INSPECT" />
        <OperationCreate v-else-if="operationDialogStore.dialog.operation === Operation.CREATE" />
        <OperationUpdate v-else-if="operationDialogStore.dialog.operation === Operation.UPDATE" />
        <OperationReport v-else-if="operationDialogStore.dialog.operation === Operation.REPORT" />
        <div v-else>TEST Selected operation is not supported</div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
