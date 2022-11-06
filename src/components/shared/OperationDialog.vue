<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { Operation } from '@/constants/core/data-enums'
import { useLogger } from '@/use/useLogger'
import useOperationDialogStore from '@/stores/operation-dialog'
import useDataItemStore from '@/stores/data-item'
import useReportStore from '@/stores/report'
import ItemInspect from '@/components/view/data-table/ItemInspect.vue'
import ItemCreate from '@/components/view/data-table/ItemCreate.vue'
import ItemUpdate from '@/components/view/data-table/ItemUpdate.vue'
import ItemReport from '@/components/view/data-table/ItemReport.vue'
import { onUnmounted } from 'vue'

// Props & Emits
const emits = defineEmits<{ (eventName: 'on-close-dialog'): void }>()

const { log } = useLogger()
const operationDialogStore = useOperationDialogStore()
const dataItemStore = useDataItemStore()
const reportStore = useReportStore()

async function onCloseDialog(): Promise<void> {
  try {
    dataItemStore.$reset()
    reportStore.$reset()
    operationDialogStore.$reset()
    emits('on-close-dialog')
  } catch (error) {
    log.error('OperationDialog:onCloseDialog', error)
  }
}

onUnmounted(() => {
  operationDialogStore.$reset()
})
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
        <QBtn flat round :icon="Icon.CLOSE" @click="onCloseDialog()" />
      </QCardActions>

      <QCardSection>
        <ItemInspect
          v-if="operationDialogStore.operation === Operation.INSPECT"
          :table="operationDialogStore.table"
        />
        <ItemCreate
          v-else-if="operationDialogStore.operation === Operation.CREATE"
          :table="operationDialogStore.table"
          @on-create-confirmed="onCloseDialog()"
        />
        <ItemUpdate
          v-else-if="operationDialogStore.operation === Operation.UPDATE"
          :table="operationDialogStore.table"
          @on-update-confirmed="onCloseDialog()"
        />
        <ItemReport
          v-else-if="operationDialogStore.operation === Operation.REPORT"
          :table="operationDialogStore.table"
        />
        <div v-else>Selected operation is not supported</div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
