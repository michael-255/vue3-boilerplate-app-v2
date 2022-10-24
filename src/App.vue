<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { onMounted, type Ref, ref, watch, markRaw } from 'vue'
import { useLogger } from '@/use/useLogger'
import { DB } from '@/services/LocalDatabase'
import useSettingsStore from '@/stores/settings'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const { log } = useLogger()
const settings = useSettingsStore()
const route = useRoute()

const layout: Ref<any> = ref(null)

onMounted(async () => {
  // Should initialize app settings here.
  const initialSettings = await DB.initDatabaseSettings()
  settings.setDEBUG(initialSettings?.DEBUG?.settingValue || false)
  settings.setNOTIFY(initialSettings?.NOTIFY?.settingValue || false)
  settings.setINFO(initialSettings?.INFO?.settingValue || false)
})

/**
 * Watching the route for the meta layout property to change. Sets the layout component.
 */
watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      // metaLayout must exist && the imported component
      const component = metaLayout && (await import(`./layouts/${metaLayout}.vue`))
      // markRaw to avoid reactivity on component definition
      // default is the component
      // Use the default layout if the component is missing
      layout.value = markRaw(component?.default || DefaultLayout)
    } catch (error) {
      layout.value = markRaw(DefaultLayout)
      log.critical('Route layout watcher', error)
    }
  },
  { immediate: true }
)
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
