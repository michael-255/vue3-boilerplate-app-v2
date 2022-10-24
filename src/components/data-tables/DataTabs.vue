<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { ref, type Ref } from 'vue'
import useDataTabsStore from '@/stores/data-tabs'
import DataTable from '@/components/data-tables/DataTable.vue'

const dataTabs = useDataTabsStore()

const tab: Ref<number> = ref(0)
</script>

<template>
  <QTabs
    v-model="tab"
    class="bg-grey-2 text-blue-grey"
    align="justify"
    active-color="primary"
    indicator-color="primary"
    inline-label
  >
    <QTab v-for="(tab, i) in dataTabs.tabs" :key="i" :name="i" :icon="tab.icon" :label="tab.name" />
  </QTabs>

  <QSeparator />

  <QTabPanels v-model="tab" animated>
    <QTabPanel v-for="(tab, i) in dataTabs.tabs" :key="i" :name="i" class="q-pa-none">
      <DataTable :table="tab.table" />
    </QTabPanel>
  </QTabPanels>
</template>
