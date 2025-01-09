<script setup lang="ts">
import { ref, onMounted } from 'vue'
import autoAnimate from '@formkit/auto-animate'
import { useRidesStore, useUiStore } from '@/store'

import type { Vehicle } from '@/types/quotesResult'

const ridesStore = useRidesStore()
const uiStore = useUiStore()

const emit = defineEmits({
  closeModal: null,
})

const props = defineProps<{
  detail: Vehicle
}>()

const details = ref()
const included = ref(false)
const info = ref(false)
onMounted(() => {
  autoAnimate(details.value)
})
const shape = ref('line')

function addCar() {
  ridesStore.selectedVehicles = []
  ridesStore.addVehicle(props.detail)
  uiStore.currentTab = 'step2'

  //router.push('/rides/new/quote/cars')
}
</script>
<template>
  <div ref="details" class="row detail" style="gap: 16px">
    <div v-if="!info" class="column left justify-between">
      <div class="row justify-between align-start">
        <div class="column">
          <div class="category" style="text-transform: uppercase">
            {{ props.detail.vehicle.level_of_service.name }}
          </div>
          <div class="class">{{ props.detail.vehicle.vehicle_class.name }}</div>
        </div>
        <div style="height: 160px"></div>
        <div class="row" style="gap: 12px; height: min-content">
          <div class="row items-center" style="gap: 4px">
            <i class="drv-users-03" style="font-size: 16px"></i>

            <div class="icons">{{ props.detail.vehicle.pax }}</div>
          </div>
          <div class="row items-center" style="gap: 4px">
            <i class="drv-luggage-03" style="font-size: 16px"></i>

            <div class="icons">{{ props.detail.vehicle.suitcase }}</div>
          </div>
        </div>
      </div>

      <div v-if="props.detail.serviceFeatures" class="row" style="gap: 24px">
        <div class="column col separator">
          <div class="row items-center" style="gap: 4px">
            <i
              :class="
                props.detail.serviceFeatures.service_alerts
                  ? 'drv-check'
                  : 'drv-alert-triangle'
              "
              style="font-size: 16px"
            ></i>
            <div>{{ $t('texts.service_alerts') }}</div>
          </div>
          <div class="row items-center" style="gap: 4px">
            <i
              :class="
                props.detail.serviceFeatures.vehicle_geolocation
                  ? 'drv-check'
                  : 'drv-alert-triangle'
              "
              style="font-size: 16px"
            ></i>
            <div>{{ $t('texts.vehicle_location') }}</div>
          </div>
        </div>
        <div class="column col separator">
          <div class="row no-wrap" style="gap: 4px">
            <i class="drv-check" style="font-size: 16px"></i>
            <div>
              {{ $t('texts.driver_vehicle_details') }}
              {{ props.detail.serviceFeatures.driver_details.value }}
              {{ $t('texts.days_before') }}
            </div>
          </div>
        </div>
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="info = true"
        >
          <rect y="0.5" width="32" height="32" rx="16" fill="#58585C" />
          <path
            d="M16.0007 19.1666V16.4999M16.0007 13.8333H16.0073M22.6673 16.4999C22.6673 20.1818 19.6826 23.1666 16.0007 23.1666C12.3188 23.1666 9.33398 20.1818 9.33398 16.4999C9.33398 12.818 12.3188 9.83325 16.0007 9.83325C19.6826 9.83325 22.6673 12.818 22.6673 16.4999Z"
            stroke="white"
            stroke-width="0.8"
            stroke-linecap="square"
            stroke-linejoin="bevel"
          />
        </svg>
      </div>
    </div>
    <div
      v-if="info"
      class="column left justify-between"
      style="padding: 5px 10px 10px 10px"
    >
      <div class="row justify-between align-start">
        <div class="title_service">
          {{ $t('texts.service_features.label') }}
        </div>

        <i
          class="drv-x-close"
          style="font-size: 24px"
          @click="info = false"
        ></i>
      </div>

      <div class="column" style="gap: 16px">
        <div class="column" style="gap: 4px">
          <div class="infoTitle">
            {{ $t('texts.service_features.ride.label') }}
          </div>
          <div class="infoText">
            {{ $t('texts.service_features.ride.meet_greet') }}<br />
            {{ $t('texts.service_features.ride.english_chauffer') }}.<br />
            {{ $t('texts.service_features.ride.complimentary') }}.
          </div>
        </div>
        <div class="column" style="gap: 4px">
          <div class="infoTitle">
            {{ $t('texts.service_features.vehicle.label') }}
          </div>
          <div class="infoText">
            {{ props.detail.vehicleExamples }}<br />
            Less than 5 years old
          </div>
        </div>
        <div class="column" style="gap: 4px">
          <div class="infoTitle">INCLUDED WAITING TIME</div>
          <div class="infoText">
            15 min: home addresses and yacht marinas.<br />
            30 min: cruise ship terminals and domestic flights.<br />
            1h: international flights.
          </div>
        </div>
        <div class="column" style="gap: 4px">
          <div class="infoTitle">FREE CANCELLATION</div>
          <div class="infoText">
            One way ride: 2 hours before pick-up.<br />
            Hourly-based journey: 8 hours before pick-up.
          </div>
        </div>
      </div>
    </div>

    <div class="column col right" style="padding-left: 16px">
      <div class="row justify-between items-center">
        <div style="text-transform: uppercase">
          {{ $t('texts.booking_details') }}
        </div>
        <i
          class="drv-x-close"
          style="font-size: 20px"
          @click="$emit('closeModal')"
        ></i>
      </div>
      <div class="column col justify-between">
        <div
          class="column col"
          style="border-bottom: 1px solid #bebebe; padding: 16px 0px 24px 0px"
        >
          <div
            v-if="uiStore.rideType == 'oneway'"
            class="row justify-between items-center"
            style="padding: 12px; background-color: #58585c"
          >
            <div class="column" style="gap: 2px">
              <div style="font-size: 18px">{{ $t('texts.one_way') }}</div>
              <div style="font-size: 15px">
                {{ $t('texts.door_door_direct') }}
              </div>
            </div>
            <div class="row items-center">
              <q-radio
                v-model="shape"
                left-label
                val="line"
                :label="$t('texts.included')"
                checked-icon="img:/src/assets/svg/icons/radio_selected.svg"
                unchecked-icon="img:/src/assets/svg/icons/radio_unselected.svg"
              />
            </div>
          </div>
          <div
            v-if="uiStore.rideType == 'hourly'"
            class="row justify-between items-center"
            style="padding: 12px; background-color: #58585c"
          >
            <div class="column" style="gap: 2px">
              <div style="font-size: 18px">{{ $t('texts.hourly') }}</div>
              <div style="font-size: 15px">4h service</div>
            </div>
            <div class="row items-center">
              <q-radio
                v-model="shape"
                left-label
                val="line"
                label=""
                checked-icon="img:/src/assets/svg/icons/radio_selected.svg"
                unchecked-icon="img:/src/assets/svg/icons/radio_unselected.svg"
              />
            </div>
          </div>
        </div>

        <div class="row" style="padding: 16px 0 0 0">
          <div
            v-if="ridesStore.quoteResults[0].requestType == null"
            class="col"
          >
            <div>{{ $t('texts.total_incl_tax') }}</div>
            <div>
              {{ props.detail.totalSalesPrice.toFixed(2)
              }}{{ uiStore.currency.symbol }}
            </div>
          </div>
          <q-btn
            flat
            no-caps
            text-color="white"
            :label="$t('buttons.next')"
            style="background-color: #fc6621"
            @click="addCar()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.left {
  width: 480px;
}
.detail {
  background-color: #2e2e33;
  padding: 16px;
  color: white;
  min-height: 420px;
}
.category {
  font-size: 15px;
  font-weight: 400;
  color: #bebebe;
}
.class {
  font-size: 25px;
}
.right {
  border-left: 1px solid #bebebe;
}
.separator {
  border-left: 1px solid #58585c;
  padding-left: 12px;
}

.infoTitle {
  color: #bebebe;
  font-size: 12px;
  line-height: 110%;
  /* or 13px */
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.infoText {
  font-size: 15px;
  letter-spacing: -0.01em;
  line-height: 130%;
}
.title_service {
  font-size: 20px;
  line-height: 130%;
  /* identical to box height, or 26px */
  letter-spacing: -0.01em;
}

/* radio button custom */

.custom-radio {
  display: inline-block;
  position: relative;
  padding-left: 30px; /* Adjust based on SVG size */
  cursor: pointer;
  user-select: none;
}

.custom-radio input[type='radio'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio label {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px; /* Width of your SVG */
  height: 24px; /* Height of your SVG */
  background-size: cover;
}

.custom-radio input[type='radio']:checked + label {
  background-image: url('../../../assets/svg/icons/radio_selected.svg');
}

.custom-radio input[type='radio'] + label {
  background-image: url('../../../assets/svg/icons/radio_unselected.svg');
}
</style>
