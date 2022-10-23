<script setup lang="ts">
import type { DataTab } from '@/constants/types-interfaces'
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { useRoute } from 'vue-router'
import { onMounted, ref, type Ref } from 'vue'
import DataTable from '@/components/data-tables/DataTable.vue'

const route = useRoute()

const tab: Ref<number> = ref(0)
const tabs: Ref<DataTab[]> = ref([])

onMounted(async () => {
  tabs.value = (route.meta?.tabs as DataTab[]) || []
  /**
   * @todo log/error if tabs are empty
   */
})
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
    <QTab v-for="(tab, i) in tabs" :key="i" :name="i" :icon="tab.icon" :label="tab.name" />
  </QTabs>

  <QSeparator />

  <QTabPanels v-model="tab" animated>
    <QTabPanel v-for="(tab, i) in tabs" :key="i" :name="i" class="q-pa-none">
      <DataTable :table="tab.table" />
    </QTabPanel>
  </QTabPanels>
</template>
