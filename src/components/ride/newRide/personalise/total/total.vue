<script setup lang="ts">
import addVehiclePopup from '../forms/addVehiclePopup.vue'
import { ref, watch } from 'vue'

import { useRidesStore, useUiStore } from '@/store'
import mapComponent from '../../../../../components/common/mapComponent.vue'

import modalConfirmed from './modalConfirmed.vue'

const uiStore = useUiStore()
const ridesStore = useRidesStore()

const add_vehicle = ref(false)
const remove_vehicle = ref(false)
const view_map = ref(false)
const terms_conditions = ref(false)
const booking_confirmed = ref(false)
const selectedCar = ref()

function removeCar() {
  ridesStore.removeVehicle(selectedCar.value)
  remove_vehicle.value = false
}

const totalPrice = ref('')
if (ridesStore.quoteResults[0].requestType == null)
  totalPrice.value = ridesStore.selectedVehicles[0].totalSalesPrice.toFixed(2)

//watch for changes in management fee
watch(
  [() => ridesStore.selectedVehicles, () => ridesStore.mySettings.managementFee],
  () => {
    if (ridesStore.selectedVehicles && ridesStore.selectedVehicles.length > 0) {
      // Convertir explícitamente a números usando parseFloat
      const managementFee = parseFloat(ridesStore.mySettings.managementFee || '0')
      const vehiclePrice = parseFloat(ridesStore.selectedVehicles[0].totalSalesPrice)

      // Realizar la suma como números
      const total = managementFee + vehiclePrice

      // Convertir a string con 2 decimales solo al final
      totalPrice.value = total.toFixed(2)
    } else {
      totalPrice.value = '0.00'
    }
  },
  { immediate: true }
)

const origin = ref({ lat: 40.4168, lng: -3.7038 }) // Madrid
const destination = ref({ lat: 41.3851, lng: 2.1734 }) // Barcelona

const handleRouteCalculated = (result) => {
  console.log('Ruta calculada:', result)
}

const handleError = (error) => {
  console.error('Error en el mapa:', error)
}
function changeOriginDestination() {
  view_map.value = true
  origin.value = {
    lat: ridesStore.quoteResults[0].segments[0].latitude,
    lng: ridesStore.quoteResults[0].segments[0].longitude
  }
  destination.value = {
    lat: ridesStore.quoteResults[0].segments[1].latitude,
    lng: ridesStore.quoteResults[0].segments[1].longitude
  }
}
</script>
<template>
  <div
    v-if="ridesStore.quoteResults[0].requestType == null"
    class="row justify-between"
    style="padding: 16px; background-color: #f8f6f4; font-size: 15px"
  >
    <div class="total row items-center">
      Total &nbsp;
      <div class="subtext">(incl. tax)</div>
    </div>
    <div class="total">{{ totalPrice }}€</div>
  </div>
  <div class="column" style="gap: 16px">
    <div class="row justify-between">
      <div class="title">RIDE DETAILS</div>
      <div class="row" style="gap: 5px; color: #58585c" @click="changeOriginDestination()">
        <div class="map">View Map</div>
        <i class="drv-map-01" style="font-size: 16px"></i>
      </div>
    </div>

    <div class="row justify-between">
      <div
        v-if="uiStore.rideType == 'oneway'"
        class="row items-center justify-between col"
        style="gap: 5px"
      >
        <div class="row items-center" style="gap: 5px">
          <i class="drv-arrow-narrow-right" style="font-size: 16px"></i>
          <div>One way</div>
        </div>
        <div>{{ uiStore.convertDate(ridesStore.quoteResults[0].segments[0].date)[0] }}</div>
      </div>
      <div v-if="uiStore.rideType == 'hourly'" class="row items-center justify-between col">
        <div class="row items-center" style="gap: 5px">
          <i class="drv-clock" style="font-size: 16px"></i>
          <div>Hourly</div>
        </div>
        <div>April 16th</div>
      </div>
    </div>

    <div class="column" style="gap: 16px; position: relative; padding-left: 16px">
      <div class="column">
        <div class="point title">PICK UP</div>
        <div class="row justify-between">
          <div>{{ ridesStore.quoteResults[0].segments[0].name }}</div>
          <div>
            {{
              ridesStore.convertToTimeWithAmPmFromISO(
                ridesStore.quoteResults[0].segments[0].iso_datetime
              )
            }}
          </div>
        </div>
      </div>
      <div class="column">
        <div class="point title">DROP OFF</div>
        <div class="row justify-between">
          <div>{{ ridesStore.quoteResults[0].segments[1].name }}</div>
          <div>
            {{
              ridesStore.convertToTimeWithAmPmFromISO(
                ridesStore.quoteResults[0].segments[1].iso_datetime
              )
            }}
          </div>
        </div>
      </div>
      <div class="line_container row items-center justify-center">
        <div class="line"></div>
      </div>
    </div>
    <div
      class="column"
      style="border-top: 1px solid rgba(88, 88, 92, 0.25); padding-top: 20px; padding-bottom: 20px"
    >
      <div class="title" style="height: 24px">VEHICLES</div>
      <template v-for="vehicle in ridesStore.selectedVehicles" :key="vehicle.vehicleId">
        <div class="row" style="gap: 8px">
          <div class="bg-grey-2" style="width: 55px"></div>
          <div class="column col">
            <div>
              {{ vehicle.vehicle.vehicle_class.name }} {{ vehicle.vehicle.level_of_service.name }}
              {{
                ridesStore.quoteResults[0].requestType != null
                  ? ''
                  : ',' + vehicle.totalSalesPrice.toFixed(2) + '€'
              }}
            </div>
            <div class="travelers row items-center" style="gap: 6px">
              <div>Travelers:{{ vehicle.vehicle.pax }}</div>
            </div>
          </div>
          <q-btn
            unelevated
            dense
            style="background-color: #f2efea; width: 28px; height: 28px"
            @click="removeCar()"
            ><svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2.5H10M2 4.5H14M12.6667 4.5L12.1991 11.5129C12.129 12.565 12.0939 13.0911 11.8667 13.49C11.6666 13.8412 11.3648 14.1235 11.0011 14.2998C10.588 14.5 10.0607 14.5 9.00623 14.5H6.99377C5.93927 14.5 5.41202 14.5 4.99889 14.2998C4.63517 14.1235 4.33339 13.8412 4.13332 13.49C3.90607 13.0911 3.871 12.565 3.80086 11.5129L3.33333 4.5"
                stroke="#2E2E33"
                stroke-width="0.8"
                stroke-linecap="square"
                stroke-linejoin="bevel"
              />
            </svg>
          </q-btn>
        </div>
      </template>
    </div>
    <div
      class="column"
      style="border-top: 1px solid rgba(88, 88, 92, 0.25); padding-top: 20px; padding-bottom: 20px"
    >
      <div class="title row items-center justify-end" style="height: 24px">
        <q-btn
          unelevated
          dense
          color="secondary"
          no-caps
          text-color="black"
          label="Add vehicle"
          style="
            padding-left: 8px;
            padding-right: 8px;
            font-weight: 400;
            font-size: 12px;
            line-height: 13px;
            border-radius: 4px;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            height: 24px;
          "
          @click="add_vehicle = true"
        />
      </div>
    </div>
    <div class="column" style="gap: 10px">
      <div
        v-if="uiStore.currentTab == 'step3'"
        class="row"
        style="gap: 12px; padding-top: 8px; padding-bottom: 8px"
      >
        <q-checkbox v-model="terms_conditions" dense />
        <div>I agree to the Terms & conditions and Privacy policy</div>
      </div>
      <div class="row" style="gap: 8px; height: 42px">
        <q-btn
          dense
          class="col"
          no-caps
          unelevated
          text-color="black"
          style="background-color: #f2efea !important"
          label="Save quote"
          @click="ridesStore.saveQuote()"
        />
        <q-btn
          v-if="uiStore.currentTab == 'step2'"
          dense
          class="col"
          no-caps
          unelevated
          color="accent"
          label="Next"
          @click="uiStore.currentTab = 'step3'"
        />
        <q-btn
          v-if="uiStore.currentTab == 'step3'"
          dense
          class="col"
          no-caps
          unelevated
          color="accent"
          label="Book now"
        />
      </div>
    </div>
  </div>
  <q-dialog v-model="add_vehicle" persistent full-width>
    <div class="dialog column" style="gap: 10px">
      <div class="row justify-between items-center">
        <div>ADD VEHICLE</div>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="add_vehicle = false"
        >
          <path
            d="M12.2858 11.3207L11.1073 12.4992L6.39322 7.7852L1.67918 12.4992L0.500666 11.3207L5.21471 6.60669L0.500666 1.89264L1.67918 0.714133L12.2858 11.3207ZM12.2858 1.89264L8.75024 5.42818L7.57173 4.24967L11.1073 0.714133L12.2858 1.89264Z"
            fill="#2E2E33"
          />
        </svg>
      </div>
      <addVehiclePopup @change="add_vehicle = false" />
    </div>
  </q-dialog>
  <q-dialog v-model="remove_vehicle" persistent>
    <div class="dialog column" style="width: 450px; gap: 15px">
      <div class="column justify-center items-center" style="height: 103px">
        <div style="font-size: 25px">Do you want to discard this vehicle?</div>
        <div style="font-size: 15px; color: #58585c">This action can’t be undone</div>
      </div>
      <div class="row" style="gap: 8px">
        <q-btn
          class="col"
          no-caps
          unelevated
          color="primary"
          label="Discard"
          @click="removeCar()"
        />
        <q-btn
          class="col"
          text-color="black"
          no-caps
          unelevated
          color="primary"
          label="Cancel"
          style="background-color: #e6e2dc !important"
          @click="remove_vehicle = false"
        />
      </div>
    </div>
  </q-dialog>
  <q-dialog v-model="view_map" full-width>
    <div class="bg-white column" style="padding: 16px">
      <div class="row justify-between">
        <div>YOUR RIDE</div>
        <i class="drv-x-close" style="font-size: 20px" @click="view_map = false"></i>
      </div>
      <mapComponent
        :origin="origin"
        :destination="destination"
        travel-mode="DRIVING"
        @route-calculated="handleRouteCalculated"
        @error="handleError"
      />
    </div>
  </q-dialog>
  <q-dialog v-model="booking_confirmed" persistent>
    <modalConfirmed />
  </q-dialog>
</template>

<style scoped>
.total {
  font-size: 20px;
  /* Total (incl. tax) */
}
.subtext {
  font-size: 15px;
  /* (incl. tax) */
}

.point {
  position: relative;
}
.point::before {
  content: '';
  position: absolute;
  top: 4px;
  left: -10px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(16, 16, 16, 0.8); /* Change to desired color and opacity */
  pointer-events: none; /* Ensure the overlay doesn't interfere with any click events */
}
.line_container {
  position: absolute;
  left: 6px;
  width: 4px;
  height: 100%;

  padding-top: 5px;
  padding-bottom: 30px;
}
.line {
  height: 100%;
  width: 1px;

  background-color: #121212;
}
.title {
  line-height: 13px;
  font-size: 12px;
  color: #58585c;
}
.map {
  font-size: 15px;
  line-height: 16px;
}
.travelers {
  font-size: 12px;
  line-height: 15px;
  color: #747477;
}
.dialog {
  background-color: #f8f6f4;
  padding: 16px;
}
</style>
