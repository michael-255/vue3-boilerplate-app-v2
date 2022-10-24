<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { type AppTable, Operation, Field } from '@/constants/core/data-enums'
import { type Ref, ref, onMounted } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import DataTableDialog from '@/components/dialogs/DataTableDialog.vue'
import InspectItem from '@/components/data-tables/InspectItem.vue'
// import CreateItem from '@/components/data-tables/CreateItem.vue'
// import UpdateItem from '@/components/data-tables/UpdateItem.vue'
// import ReportItem from '@/components/data-tables/ReportItem.vue'
import useDataTableStore from '@/stores/data-table'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import useTemporaryItemStore from '@/stores/temporary-item'
import useReportStore from '@/stores/report'
import type { DataTableProps } from '@/constants/types-interfaces'

/**
 * Component allows you to view and perform operations on table data.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const selected = useSelectedItemStore()
const validate = useValidateItemStore()
const temporary = useTemporaryItemStore()
const report = useReportStore()
const dataTable = useDataTableStore()
const searchFilter: Ref<string> = ref('')

/**
 * Sets the page-table store up and loads the table rows.
 */
onMounted(async () => {
  try {
    dataTable.columns = DB.getColumnsForTable(props.table)
    dataTable.columnOptions = DB.getColumnsForTable(props.table).filter(
      (col: DataTableProps) => !col.required
    )
    dataTable.visibleColumns = DB.getVisibleColumnsForTable(props.table)
    dataTable.itemLabel = DB.getLabelSingularForTable(props.table)
    await updateRows()
  } catch (error) {
    log.error('PageTable:onMounted', error)
  }
})

/**
 * Loads the latest data into the data table rows.
 */
async function updateRows(): Promise<void> {
  dataTable.rows = await DB.getAllDataForTable(props.table)
}

/**
 * Closes the fullscreen dialog after reseting the stores and updating the table rows.
 */
async function closeDialog(): Promise<void> {
  try {
    await updateRows()
    selected.$reset()
    validate.$reset()
    temporary.$reset()
    report.$reset()
    dataTable.operation = Operation.NOOP
    dataTable.dialog = false // Always last so everything else is updated before dialog changes
  } catch (error) {
    log.error('PageTable:closeDialog', error)
  }
}

async function onCreate(): Promise<void> {
  try {
    dataTable.operation = Operation.CREATE
    dataTable.dialog = true
  } catch (error) {
    log.error('PageTable:onCreate', error)
  }
}

async function onUpdate(id: string): Promise<void> {
  try {
    selected.setItem(await DB.getFirstByField(props.table, Field.ID, id))
    dataTable.operation = Operation.UPDATE
    dataTable.dialog = true
  } catch (error) {
    log.error('PageTable:onUpdate', error)
  }
}

async function onReport(id: string): Promise<void> {
  try {
    selected.setItem(await DB.getFirstByField(props.table, Field.ID, id))
    dataTable.operation = Operation.REPORT
    dataTable.dialog = true
  } catch (error) {
    log.error('PageTable:onReport', error)
  }
}

async function onInspect(id: string): Promise<void> {
  try {
    selected.setItem(await DB.getFirstByField(props.table, Field.ID, id))
    dataTable.operation = Operation.INSPECT
    dataTable.dialog = true
  } catch (error) {
    log.error('PageTable:onInspect', error)
  }
}

async function onClear(): Promise<void> {
  if (DB.getOperationsForTable(props.table).includes(Operation.CLEAR)) {
    confirmDialog(
      'Clear',
      `Permanently delete all ${DB.getLabelPluralForTable(props.table)}?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await DB.clear(props.table)
          await updateRows()
        } catch (error) {
          log.error('PageTable:onClear', error)
        }
      }
    )
  } else {
    log.warn(`Clear not supported for ${DB.getLabelPluralForTable(props.table)} table`)
  }
}

async function onDelete(id: string): Promise<void> {
  if (DB.getOperationsForTable(props.table).includes(Operation.DELETE)) {
    confirmDialog(
      'Delete',
      `Permanently delete "${id}" from ${DB.getLabelPluralForTable(props.table)}?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await DB.deleteById(props.table, id)
          await updateRows()
        } catch (error) {
          log.error('PageTable:onDelete', error)
        }
      }
    )
  } else {
    log.warn(`Delete not supported for ${DB.getLabelPluralForTable(props.table)} table`)
  }
}
</script>

<template>
  <QTable
    :rows="dataTable.rows"
    :columns="dataTable.columns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
    row-key="id"
    :visible-columns="dataTable.visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <!-- Search Input -->
      <QInput
        :disable="!dataTable.rows.length"
        outlined
        dense
        debounce="300"
        v-model="searchFilter"
        placeholder="Search"
        class="q-mr-sm q-mb-sm"
      >
        <template v-slot:append>
          <QIcon name="search" />
        </template>
      </QInput>

      <!-- Column Select -->
      <QSelect
        v-model="dataTable.visibleColumns"
        :disable="!dataTable.rows.length"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="dataTable.columnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <!-- Create Btn -->
        <QBtn
          v-if="DB.getOperationsForTable(table).includes(Operation.CREATE)"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="onCreate()"
        />
        <!-- Clear Btn -->
        <QBtn
          v-if="DB.getOperationsForTable(table).includes(Operation.CLEAR)"
          :disable="!dataTable.rows.length"
          color="negative"
          label="Clear"
          @click="onClear()"
          class="q-mb-sm"
        />
      </div>
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
            v-if="DB.getOperationsForTable(table).includes(Operation.REPORT)"
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
            v-if="DB.getOperationsForTable(table).includes(Operation.INSPECT)"
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
            v-if="DB.getOperationsForTable(table).includes(Operation.UPDATE)"
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
            v-if="DB.getOperationsForTable(table).includes(Operation.DELETE)"
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
    <InspectItem v-if="dataTable.operation === Operation.INSPECT" :table="table" />

    <!-- <CreateItem
      v-else-if="dataTable.operation === Operation.CREATE"
      :table="table"
      @on-create-confirmed="closeDialog()"
    />

    <UpdateItem
      v-else-if="dataTable.operation === Operation.UPDATE"
      :table="table"
      @on-update-confired="closeDialog()"
    />

    <ReportItem v-else-if="dataTable.operation === Operation.REPORT" :table="table" /> -->

    <div v-else>Selected operation is not supported</div>
  </DataTableDialog>
</template>
