<script setup lang="ts">
import { ref } from 'vue'

import { useRidesStore } from '../../store'

const props = defineProps({
  label: String
})

const ridesStore = useRidesStore()

const emits = defineEmits({
  change: null
})
const from = ref('')
const loading = ref(false)

function searchLocations(location: string, update: (arg0: () => void) => void, abort: () => void) {
  let lat = 0
  let lon = 0
  ridesStore.listLocations = []

  if (location.length < 3) {
    abort()
    return
  }
  update(() => {
    loading.value = true
    if (ridesStore.quoteRide.pickup_1.lat != 0 && ridesStore.quoteRide.pickup_1.lon != 0) {
      lat = ridesStore.quoteRide.pickup_1.lat
      lon = ridesStore.quoteRide.pickup_1.lon
    }
    ridesStore.searchLocations(location, lat, lon).then(() => {
      loading.value = false
    })
    //   services.searchLocations(location).then(()=>{
    //   loading.value=false
    // })
  })
}
</script>
<template>
  <q-select
    v-model="from"
    filled
    class="col"
    dense
    use-input
    hide-selected
    fill-input
    :label="props.label"
    option-label="name"
    :options="ridesStore.listLocations"
    :input-debounce="500"
    :loading="loading"
    dropdown-icon=""
    @filter="searchLocations"
    @update:model-value="emits('change', from)"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <div v-if="scope.opt.iata != '' || scope.opt.icao != ''" style="font-size: 10px">
            {{ scope.opt.iata != false ? scope.opt.iata : scope.opt.icao }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
