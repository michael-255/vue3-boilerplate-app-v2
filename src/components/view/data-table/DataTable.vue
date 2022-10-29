<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { type AppTable, Operation, Field } from '@/constants/core/data-enums'
import { type Ref, ref, onMounted } from 'vue'
import type { DataTableProps } from '@/constants/types-interfaces'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { TableHelper } from '@/services/TableHelper'
import DataTableDialog from './DataTableDialog.vue'
import ItemInspect from './ItemInspect.vue'
import ItemCreate from './ItemCreate.vue'
import ItemUpdate from './ItemUpdate.vue'
import ItemReport from './ItemReport.vue'
import useDataTableStore from '@/stores/data-table'
import useReportStore from '@/stores/report'
import useDataItemStore from '@/stores/data-item'

/**
 * Component allows you to view and perform operations on table data.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const reportStore = useReportStore()
const dataTableStore = useDataTableStore()
const dataItemStore = useDataItemStore()
const searchFilter: Ref<string> = ref('')

/**
 * Sets the page-table store up and loads the table rows.
 */
onMounted(async () => {
  try {
    const cols = TableHelper.getColumns(props.table)
    dataTableStore.columns = cols
    dataTableStore.columnOptions = cols.filter((col: DataTableProps) => !col.required)
    dataTableStore.visibleColumns = TableHelper.getVisibleColumns(props.table)
    dataTableStore.itemLabel = TableHelper.getLabelSingular(props.table)
    await updateRows()
  } catch (error) {
    log.error('DataTable:onMounted', error)
  }
})

/**
 * Loads the latest data into the data table rows.
 */
async function updateRows(): Promise<void> {
  dataTableStore.rows = await DB.getAll(props.table)
}

/**
 * Closes the fullscreen dialog after reseting the stores and updating the table rows.
 */
async function closeDialog(): Promise<void> {
  try {
    await updateRows()
    dataItemStore.$reset()
    reportStore.$reset()
    dataTableStore.operation = Operation.NOOP
    dataTableStore.dialog = false // Always last so everything else is updated before dialog changes
  } catch (error) {
    log.error('DataTable:closeDialog', error)
  }
}

async function onCreate(): Promise<void> {
  try {
    dataTableStore.operation = Operation.CREATE
    dataTableStore.dialog = true
  } catch (error) {
    log.error('DataTable:onCreate', error)
  }
}

async function onUpdate(id: string): Promise<void> {
  try {
    dataItemStore.setSelectedItem(await DB.getFirstByField(props.table, Field.ID, id))
    dataTableStore.operation = Operation.UPDATE
    dataTableStore.dialog = true
  } catch (error) {
    log.error('DataTable:onUpdate', error)
  }
}

async function onReport(id: string): Promise<void> {
  try {
    dataItemStore.setSelectedItem(await DB.getFirstByField(props.table, Field.ID, id))
    dataTableStore.operation = Operation.REPORT
    dataTableStore.dialog = true
  } catch (error) {
    log.error('DataTable:onReport', error)
  }
}

async function onInspect(id: string): Promise<void> {
  try {
    dataItemStore.setSelectedItem(await DB.getFirstByField(props.table, Field.ID, id))
    dataTableStore.operation = Operation.INSPECT
    dataTableStore.dialog = true
  } catch (error) {
    log.error('DataTable:onInspect', error)
  }
}

async function onClear(): Promise<void> {
  if (TableHelper.getOperations(props.table).includes(Operation.CLEAR)) {
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
          log.error('DataTable:onClear', error)
        }
      }
    )
  } else {
    log.warn(`Clear not supported for ${TableHelper.getLabelPlural(props.table)} table`)
  }
}

async function onDelete(id: string): Promise<void> {
  if (TableHelper.getOperations(props.table).includes(Operation.DELETE)) {
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
          log.error('DataTable:onDelete', error)
        }
      }
    )
  } else {
    log.warn(`Delete not supported for ${TableHelper.getLabelPlural(props.table)} table`)
  }
}
</script>

<template>
  <QTable
    :rows="dataTableStore.rows"
    :columns="dataTableStore.columns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
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
          @click="onCreate()"
        />
        <!-- Clear Btn -->
        <QBtn
          v-if="TableHelper.getOperations(table).includes(Operation.CLEAR)"
          :disable="!dataTableStore.rows.length"
          color="negative"
          label="Clear"
          @click="onClear()"
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
            @click="onReport(props.cols[0].value)"
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
            @click="onInspect(props.cols[0].value)"
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
            @click="onUpdate(props.cols[0].value)"
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
            @click="onDelete(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Fullscreen Dialog -->
  <DataTableDialog @on-dialog-close="closeDialog()">
    <ItemInspect v-if="dataTableStore.operation === Operation.INSPECT" :table="table" />

    <ItemCreate
      v-else-if="dataTableStore.operation === Operation.CREATE"
      :table="table"
      @on-create-confirmed="closeDialog()"
    />

    <ItemUpdate
      v-else-if="dataTableStore.operation === Operation.UPDATE"
      :table="table"
      @on-update-confirmed="closeDialog()"
    />

    <ItemReport v-else-if="dataTableStore.operation === Operation.REPORT" :table="table" />

    <div v-else>Selected operation is not supported</div>
  </DataTableDialog>
</template>
