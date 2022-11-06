<script setup lang="ts">
import { QPage } from 'quasar'
import MessageCard from './MessageCard.vue'
</script>

<template>
  <QPage padding>
    <div class="row q-col-gutter-md justify-start">
      <div class="col-12">
        <MessageCard />
      </div>
    </div>
  </QPage>
</template>
