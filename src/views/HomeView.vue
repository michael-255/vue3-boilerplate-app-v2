<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { Field } from '@/constants/data-enums'

const state = {
  item: Object.values(Field).reduce((o, key) => ({ ...o, [key]: null }), {}),
}
</script>

<template>
  <main>
    <TheWelcome />
    {{ state }}
  </main>
</template>
