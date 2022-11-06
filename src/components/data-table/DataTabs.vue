<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import useDataTableStore from '@/stores/data-table'
import DataTable from '@/components/data-table/DataTable.vue'

const dataTableStore = useDataTableStore()
</script>

<template>
  <QPage>
    <QTabs
      v-model="dataTableStore.selectedTab"
      align="justify"
      active-color="primary"
      indicator-color="primary"
      inline-label
    >
      <QTab
        v-for="(tab, i) in dataTableStore.tabs"
        :key="i"
        :name="tab.name"
        :icon="tab.icon"
        :label="tab.name"
      />
    </QTabs>

    <QSeparator />

    <QTabPanels v-model="dataTableStore.selectedTab" animated>
      <QTabPanel
        v-for="(tab, i) in dataTableStore.tabs"
        :key="i"
        :name="tab.name"
        class="q-pa-none"
      >
        <DataTable :table="tab.table" />
      </QTabPanel>
    </QTabPanels>
  </QPage>
</template>
