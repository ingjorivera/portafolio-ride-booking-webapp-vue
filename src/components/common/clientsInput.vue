<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore } from '@/store'

const clientsStore = useClientsStore()

const props = defineProps({
  label: String,
  addClient: Boolean,
})
const model = ref(null)

const emits = defineEmits({
  change: null,
  add: null,
})

const loading = ref(false)

clientsStore.getClients()

async function search(val: string) {
  clientsStore.searchKeyword = val
  if (val.length > 2 && model.value == null) {
    await clientsStore.searchClientsByName(val)
  }
  if (val.length == 0) {
    clientsStore.searchKeyword = ''
    model.value = null
    await clientsStore.getClients()
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
    :options="clientsStore.clients"
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
        <q-item-section>{{ $t('texts.no_result') }}</q-item-section>
      </q-item>
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <div>{{ scope.opt.name }}</div>
      </q-item>
    </template>
  </q-select>
</template>
