<script setup lang="ts">
import { useRidesStore } from '../../../store'
import { useUserStore } from '../../../store/user'
import vehicleCard from './vehicleCard.vue'
import vehicleDetail from './vehicleDetail.vue'
import { ref } from 'vue'
import type { Vehicle } from '../../../types/quotesResult'
import { useResizeObserver } from '@vueuse/core'
import { useScroll } from '@vueuse/core'

const open = ref(false)
const selection = ref('')
const open_modal = ref('')

const ridesStore = useRidesStore()
const user = useUserStore()
const vehicle = ref<Vehicle | null>(null)
const container = ref(null)
const modal_detail = ref<HTMLElement | null>(null) // Ensure it's typed as HTMLElement
const table = ref([])

const rows = ref(0)
const cols = ref(0)

const numberOfItems = ref(0)
//get width of the screen
const width_ = ref(0)
const widthContainer = ref('')

const { y } = useScroll(container)

useResizeObserver(container, entries => {
  const entry = entries[0]
  const { width } = entry.contentRect
  width_.value = width
  if (width < 800) {
    numberOfItems.value = 2
  } else if (width < 1024) {
    numberOfItems.value = 3
  } else {
    numberOfItems.value = 4
  }
  table.value = []
  //distribute the total of vehicles in an array of columns=numberofitems and rows=total
  for (let i = 0; i < ridesStore.quoteResults[0].vehicles.length; i++) {
    const row = Math.floor(i / numberOfItems.value)
    const col = i % numberOfItems.value
    table.value[row] = table.value[row] || []
    table.value[row][col] = ridesStore.quoteResults[0].vehicles[i]
  }
})

function closeModal() {
  open_modal.value = ''
  open.value = false
}

function viewModal(i: number, vehicle_: Vehicle, j: number) {
  selection.value = 'card-' + i + j
  y.value += 10
  console.log(vehicle_, 'vehicle')
  vehicle.value = vehicle_
  const total = Math.ceil(
    ridesStore.quoteResults[0].vehicles.length / numberOfItems.value,
  )

  for (let row = 0; row < total; row++) {
    const start = row * numberOfItems.value
    const end = start + numberOfItems.value
    if (i == 0) {
      open_modal.value = 'detail_' + row

      break
    } else if (i >= start && i < end) {
      open_modal.value = 'detail_' + (row + 1)
      break
    }
  }
}
</script>
<template>
  <div>
    <!-- <div class="row wrap" style="gap: 8px; width: 100%">
    <template v-for="(v, i) in user.quoteRes[0].vehicles" key="i">
      <vehicleCard
        @click="viewCar(i, v)"
        class="vehicleCard"
        :vehicle="v"
        :id="i"
      />

      <vehicleDetail
        :detail="vehicle"
        v-if="i % 4 == 0 && open_modal == 'modal_' + i"
        style="width: 100%"
        :modal="'modal_' + i"
        @closeModal="closeModal(i)"
      ></vehicleDetail>

      <div
        v-if="i == 22 && open_modal == 'modal_22'"
        style="width: 100%"
        class="row bg-red q-pa-md"
        :modal="'modal_22'"
      >
        sdfsdfsdf
      </div>
    </template>



    
    
  </div> -->
    <div ref="container" class="row wrap" style="width: 100%; gap: 10px">
      <div
        v-for="(row, i) in table"
        :key="i"
        class="row"
        style="gap: 10px; width: 100%"
      >
        <div v-for="(veh, j) in row" :key="j" class="row">
          <vehicleCard
            :id="'card-' + i + j"
            :vehicle="veh"
            :class="selection == 'card-' + i + j ? 'selected' : ''"
            :special="ridesStore.quoteResults[0].requestType != null"
            :style="{
              width: 'calc((' + width_ + 'px /' + numberOfItems + ') - 8px)',
            }"
            @click="viewModal(i, veh, j)"
          />
        </div>

        <div
          class="detail_ row"
          style="width: 100%; overflow: hidden; position: relative"
          :detailModal="'detail_' + i"
          :class="{ 'is-open': open_modal == 'detail_' + i }"
        >
          <div class="inner">
            <vehicleDetail
              v-if="vehicle"
              :detail="vehicle"
              style="width: 100%"
              :modal="'modal_' + i"
              @close-modal="closeModal(i)"
            ></vehicleDetail>
          </div>
        </div>
      </div>
    </div>

    <div
      id="message"
      class="row text-white"
      style="
        background-color: #2e2e33;
        margin-top: 24px;
        padding: 24px;
        position: sticky;
        top: 100px;
      "
    >
      <div class="row col justify-between items-center">
        <div class="column">
          <div style="font-size: 25px">{{ $t('texts.not_finding') }}</div>
          <div style="font-size: 15px; color: #bebebe">
            {{ $t('texts.submit_request_handle') }}
          </div>
        </div>
        <q-btn
          color="accent"
          text-color="white"
          :label="$t('buttons.start_custom_booking')"
          no-caps
          class="button_"
          @click="view_map = false"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.vhcard {
  width: calc((100% / 4) - 8px);
  height: 200px;
}

.detail_ {
  transition: all 0.3s ease-in-out;
  display: grid;
  grid-template-rows: 0fr;
}
.detail_.is-open {
  grid-template-rows: 1fr;
}
.inner {
  overflow: hidden;
}
.selected {
  border: 1px solid #ccc7bf;
}
</style>
