<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { isoToDisplayDate } from '@/utils/common'
import { Icon } from '@/constants/ui/icon-enums'
import { isDate } from '@/utils/validators'
import useDataItemStore from '@/stores/data-item'

const dataItemStore = useDataItemStore()
const inputRef: Ref<any> = ref(null)
const displayedDate: Ref<string> = ref('')
const dateTimePicker: Ref<string> = ref('')

// Setup
if (dataItemStore.selected?.createdDate) {
  updateDates(dataItemStore.selected.createdDate)
} else {
  updateDates()
}
dataItemStore.validate.createdDate = true

function updateDates(date: string = new Date().toISOString()): void {
  dataItemStore.temporary.createdDate = new Date(date).toISOString()
  displayedDate.value = isoToDisplayDate(date) || ''
  dataItemStore.validate.createdDate = true
}

/**
 * If a picker time exists, sets display date and model ref to the picker time.
 */
function onPickerDateTime(): void {
  if (dateTimePicker.value) {
    updateDates(dateTimePicker.value)
  }
}

function validateInput(): void {
  dataItemStore.validate.createdDate = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="displayedDate"
    ref="inputRef"
    label="Created Date"
    :rules="[(val: string) => isDate(val) || 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z']"
    dense
    outlined
    disable
    color="primary"
    @blur="validateInput()"
  >
    <template v-slot:after>
      <!-- Date Picker -->
      <QBtn :icon="Icon.CALENDAR_DATE" color="primary" class="q-ml-xs q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate v-model="dateTimePicker" mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QBtn>
      <!-- Time Picker -->
      <QBtn :icon="Icon.TIME" color="primary" class="q-ml-sm q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime v-model="dateTimePicker" now-btn mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QBtn>
      <!-- Set DateTime to now -->
      <QBtn
        :icon="Icon.CALENDAR_CHECK"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="updateDates()"
      />
    </template>
  </QInput>
</template>
