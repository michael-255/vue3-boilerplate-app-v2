<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { QSelect } from 'quasar'
import { MeasurementType } from '@/constants/core/data-enums'
import { Field } from '@/constants/core/data-enums'
import { isDefined } from '@/utils/validators'
import useTemporaryItemStore from '@/stores/temporary-item'
// import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'

const validate = useValidateItemStore()
// const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  options.value = Object.values(MeasurementType)
})

function validateInput(): void {
  validate.item.parentId = !!inputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="temporary.item[Field.MEASUREMENT_TYPE]"
    ref="inputRef"
    label="Type"
    :options="options"
    :rules="[(val: string) => isDefined(val) || '* Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
