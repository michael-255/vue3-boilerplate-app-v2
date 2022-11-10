<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { type AppTable, Operation } from '@/constants/core/data-enums'
import { type Ref, ref, onMounted } from 'vue'
import type { DataTableProps } from '@/constants/types-interfaces'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { TableHelper } from '@/services/TableHelper'
import { useOperationDialog } from '@/use/useOperationDialog'
import useDataTableStore from '@/stores/data-table'

// Props & Emits
const props = defineProps<{ table: AppTable }>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const { onOpenOperationDialog } = useOperationDialog()
const dataTableStore = useDataTableStore()
const searchFilter: Ref<string> = ref('')

onMounted(async () => {
  try {
    const cols = TableHelper.getColumns(props.table)
    dataTableStore.columns = cols
    dataTableStore.columnOptions = cols.filter((col: DataTableProps) => !col.required)
    dataTableStore.visibleColumns = TableHelper.getVisibleColumns(props.table)
    await updateRows()
  } catch (error) {
    log.error('DataTable:onMounted', error)
  }
})

async function updateRows(): Promise<void> {
  dataTableStore.rows = await DB.getAll(props.table)
}

async function onOpenClearDialog(): Promise<void> {
  confirmDialog(
    'Clear',
    `Permanently delete all ${TableHelper.getLabelPlural(props.table)}?`,
    Icon.DELETE,
    NotifyColor.ERROR,
    async () => {
      try {
        await DB.clear(props.table)
        await updateRows()
      } catch (error) {
        log.error('DataTable:onOpenClearDialog', error)
      }
    }
  )
}

async function onOpenDeleteDialog(id: string): Promise<void> {
  confirmDialog(
    'Delete',
    `Permanently delete "${id}" from ${TableHelper.getLabelPlural(props.table)}?`,
    Icon.DELETE,
    NotifyColor.ERROR,
    async () => {
      try {
        await DB.deleteById(props.table, id)
        await updateRows()
      } catch (error) {
        log.error('DataTable:onOpenDeleteDialog', error)
      }
    }
  )
}
</script>

<template>
  <QTable
    :rows="dataTableStore.rows"
    :columns="dataTableStore.columns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 80vh"
    row-key="id"
    :visible-columns="dataTableStore.visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <!-- Column Select -->
      <QSelect
        v-model="dataTableStore.visibleColumns"
        :disable="!dataTableStore.rows.length"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="dataTableStore.columnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <!-- Create Btn -->
        <QBtn
          v-if="TableHelper.getOperations(table).includes(Operation.CREATE)"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="onOpenOperationDialog(table, Operation.CREATE)"
        />
        <!-- Clear Btn -->
        <QBtn
          v-if="TableHelper.getOperations(table).includes(Operation.CLEAR)"
          :disable="!dataTableStore.rows.length"
          color="negative"
          label="Clear"
          @click="onOpenClearDialog()"
          class="q-mb-sm"
        />
      </div>
      <!-- Search Input -->
      <QInput
        :disable="!dataTableStore.rows.length"
        outlined
        dense
        clearable
        debounce="300"
        v-model="searchFilter"
        placeholder="Search"
        class="full-width q-mr-sm q-mb-sm"
      >
        <template v-slot:append>
          <QIcon name="search" />
        </template>
      </QInput>
    </template>

    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
        <QTh auto-width />
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <!-- Report Btn -->
          <QBtn
            v-if="TableHelper.getOperations(table).includes(Operation.REPORT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            @click="onOpenOperationDialog(table, Operation.REPORT, props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <!-- Details Btn -->
          <QBtn
            v-if="TableHelper.getOperations(table).includes(Operation.INSPECT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="onOpenOperationDialog(table, Operation.INSPECT, props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <!-- Edit Btn -->
          <QBtn
            v-if="TableHelper.getOperations(table).includes(Operation.UPDATE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            @click="onOpenOperationDialog(table, Operation.UPDATE, props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <!-- Delete Btn -->
          <QBtn
            v-if="TableHelper.getOperations(table).includes(Operation.DELETE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onOpenDeleteDialog(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>
</template>
