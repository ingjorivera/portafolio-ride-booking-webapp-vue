<script setup lang="ts">
import { ref } from 'vue'
import { useRidesStore, useUiStore } from '../../../../store'
import mapComponent from '../../../common/mapComponent.vue'
import vehicleList from '../../vehicleList/vehicleList.vue'
import router from '../../../../router'

const ridesStore = useRidesStore()
const uiStore = useUiStore()

const view_map = ref(false)
function chageRoute(location: string) {
  router.push(location)
}

const origin = ref({ lat: 40.4168, lng: -3.7038 }) // Madrid
const destination = ref({ lat: 41.3851, lng: 2.1734 }) // Barcelona

const handleRouteCalculated = result => {
  console.log('Ruta calculada:', result)
}

const handleError = error => {
  console.error('Error en el mapa:', error)
}
function changeOriginDestination() {
  view_map.value = true
  origin.value = {
    lat: ridesStore.quoteResults[0].segments[0].latitude,
    lng: ridesStore.quoteResults[0].segments[0].longitude,
  }
  destination.value = {
    lat: ridesStore.quoteResults[0].segments[1].latitude,
    lng: ridesStore.quoteResults[0].segments[1].longitude,
  }
}
</script>
<template>
  <div class="position:relative">
    <div class="header row" style="gap: 8px; position: relative">
      <div
        class="button_back row justify-center items-center"
        @click="chageRoute('/rides/new')"
      >
        <i class="drv-arrow-left" style="font-size: 20px"></i>
      </div>
      <div class="route row">
        <div
          class="row items-center"
          style="gap: 8px; padding-left: 16px; padding-right: 16px"
        >
          <div>{{ ridesStore.quoteResults[0].segments[0].name }}</div>
          <i class="drv-arrow-narrow-right" style="font-size: 20px"></i>
          <div>{{ ridesStore.quoteResults[0].segments[1].name }}</div>
        </div>

        <div
          class="row items-center"
          style="gap: 8px; padding-left: 16px; padding-right: 16px"
        >
          <i class="drv-clock" style="font-size: 20px"></i>
          <div>
            {{ ridesStore.quoteResults[0].serviceInfo.minutes }}
            {{ $t('texts.minutes') }}
          </div>
        </div>
        <div
          class="row items-center"
          style="gap: 8px; padding-left: 16px; padding-right: 16px"
        >
          <i class="drv-ruler" style="font-size: 20px"></i>

          <div>{{ ridesStore.quoteResults[0].serviceInfo.kilometers }} km</div>
        </div>
      </div>
      <div
        class="row justify-center items-center button_map"
        style="gap: 8px"
        @click="changeOriginDestination"
      >
        <i class="drv-map-01" style="font-size: 20px"></i>
        <div>{{ $t('buttons.view_map') }}</div>
      </div>
    </div>
    <div
      v-if="ridesStore.quoteResults[0].requestType != null"
      class="bg-black row justify-between items-center"
      style="width: 100%; color: #bebebe; padding: 16px 24px"
    >
      <div class="column">
        <div style="font-size: 20px">
          {{
            uiStore.translationsUI[ridesStore.quoteResults[0].requestType][0][
              uiStore.langSelected
            ]
          }}
        </div>
        <div style="font-size: 15px">
          {{
            uiStore.translationsUI[ridesStore.quoteResults[0].requestType][1][
              uiStore.langSelected
            ]
          }}
        </div>
      </div>
      <q-icon name="fa drv-alert-circle" style="font-size: 20px"></q-icon>
    </div>

    <div class="" style="padding: 24px; position: relative">
      <vehicleList style="margin-bottom: 20px"></vehicleList>
    </div>
    <q-dialog v-model="view_map" full-width>
      <div class="bg-white column" style="padding: 16px">
        <div class="row justify-between">
          <div style="text-transform: uppercase">
            {{ $t('texts.your_ride') }}
          </div>
          <i
            class="drv-x-close"
            style="font-size: 20px"
            @click="view_map = false"
          ></i>
        </div>
        <map-component
          :origin="origin"
          :destination="destination"
          travel-mode="DRIVING"
          @route-calculated="handleRouteCalculated"
          @error="handleError"
        />
      </div>
    </q-dialog>
  </div>
</template>
<style scoped>
.header {
  background-color: #f8f6f4;
  padding: 0px 24px 24px 24px;
}
.button_back {
  width: 52px;
  height: 52px;
  background-color: white;
}
.route {
  height: 54px;

  background-color: white;
  font-size: 20px;
}
.button_map {
  padding-left: 16px;
  padding-right: 16px;
  font-size: 20px;
  background-color: white;
}
</style>
