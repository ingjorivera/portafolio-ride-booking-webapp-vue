<script setup lang="ts">
import { ref } from 'vue'
import { useStaffStore } from '../../store/index'

const staffStore = useStaffStore()

const props = defineProps({
  label: { type: String, default: '' },
})
const model = ref(null)

const emits = defineEmits({
  change: null,
  add: null,
})

const loading = ref(false)

function addUser() {
  emits('add', 'add_profile')
  model.value = ''
}

async function search(val: string) {
  staffStore.searchKeyword = val
  if (val.length > 2) {
    await staffStore.getStaffs()
  }
  if (val.length == 0) {
    staffStore.searchKeyword = ''
    await staffStore.getStaffs()
  }
}
</script>
<template>
  <q-select
    v-model="model"
    filled
    use-input
    hide-selected
    input-debounce="0"
    fill-input
    :label="props.label"
    :options="staffStore.staffList"
    option-label="name"
    option-value="id"
    popup-content-style="max-height: 300px;  min-height: 60px; height: 150px;"
    dense
    style="width: 100%"
    :loading="loading"
    map-options
    dropdown-icon="fas drv-chevron-down"
    @input-value="search"
    @update:model-value="emits('change', model)"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $t('texts.no_result') }}
        </q-item-section>
      </q-item>
    </template>
    <template #option="scope">
      <q-item v-if="scope.index == 0" v-close-popup class="cursor-pointer">
        <div
          class="row justify-between items-center"
          style="width: 100%"
          @click="addUser"
        >
          <div>{{ $t('texts.add_user_profile') }}</div>
          <q-icon name="fas drv-plus" />
        </div>
      </q-item>
      <q-item v-bind="scope.itemProps">
        <div>{{ scope.opt.name }}</div>
      </q-item>
    </template>
  </q-select>
</template>
