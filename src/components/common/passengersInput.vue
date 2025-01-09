<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore, useAuthStore } from '../../store/index'
//import { useApiStore } from '../../store/API';
import { useUserStore } from '../../store/user'

//const api = useApiStore()

const authStore = useAuthStore()
const clientsStore = useClientsStore()

const selectRef = ref(null)
const inputValue = ref('')

const props = defineProps({
  label: String,
})
const model = ref(null)

clientsStore.searchKeyword = ''
clientsStore.getPassengers()

const emits = defineEmits({
  change: null,
  add: null,
})

const loading = ref(false)

const contacts = ref([])

//users.value=await staffStore.getStaffs()
//users.value= await api.getStaffsFirstTime(1,10,'')

//await clientsStore.getClients()

async function search(val: string) {
  inputValue.value = val
  clientsStore.searchKeyword = val
  if (val.length > 2) {
    await clientsStore.getPassengers(val)
  }
  if (val.length == 0) {
    clientsStore.searchKeyword = ''
    await clientsStore.getPassengers(val)
  }
}

function handleCreateNew() {
  emits('add', inputValue)
  selectRef.value.hidePopup()
}
</script>
<template>
  <q-select
    ref="selectRef"
    v-model="model"
    filled
    use-input
    hide-selected
    input-debounce="0"
    fill-input
    :label="props.label"
    :options="clientsStore.passengers"
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
      <q-item clickable @click="handleCreateNew">
        <q-item-section class="text-grey"> Create new contact </q-item-section>
      </q-item>
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <div>{{ scope.opt.name }}</div>
      </q-item>
    </template>
  </q-select>
</template>
