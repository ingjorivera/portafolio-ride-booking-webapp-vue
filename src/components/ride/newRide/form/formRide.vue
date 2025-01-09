<script setup lang="ts">
import { ref } from 'vue'
import locationsInput from '../../../common/locationsInput.vue'
import type { Location } from '@/types/rides'
import timePicker from '../../../common/timePicker.vue'
import { useRidesStore } from '@/store'

interface FormRideProps {
  typeSel?: {
    label?: string
    val?: number
  }
}

const props = defineProps<FormRideProps>()

const ridesStore = useRidesStore()

const calendar = ref(false)
const calendar1 = ref(false)

function isDateValid(date: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selectedDate = new Date(date)
  return selectedDate >= today
}

async function setFrom(location: Location) {
  if (location.lat == 0 || location.lon == 0) {
    await ridesStore.getLocationInfo(location.gReference || '').then(res => {
      console.log(res, 'res')
      ridesStore.quoteRide.pickup_1 = {
        lat: res.lat,
        lon: res.long,
        name: res.name,
        type: res.type,
      }
    })
  } else {
    ridesStore.quoteRide.pickup_1 = location
  }
}
async function setTo(location: Location) {
  if (location.lat == 0 || location.lon == 0) {
    await ridesStore.getLocationInfo(location.gReference || '').then(res => {
      console.log(res, 'res')
      ridesStore.quoteRide.dropoff_1 = {
        lat: res.lat,
        lon: res.long,
        name: res.name,
        type: res.type,
      }
    })
  } else {
    ridesStore.quoteRide.dropoff_1 = location
  }
}

async function setFrom2(location: Location) {
  if (location.lat == 0 || location.lon == 0) {
    await ridesStore.getLocationInfo(location.gReference || '').then(res => {
      console.log(res, 'res')
      ridesStore.quoteRide.pickup_2 = {
        lat: res.lat,
        lon: res.long,
        name: res.name,
        type: res.type,
      }
    })
  } else {
    ridesStore.quoteRide.pickup_2 = location
  }
}
async function setTo2(location: Location) {
  if (location.lat == 0 || location.lon == 0) {
    await ridesStore.getLocationInfo(location.gReference || '').then(res => {
      console.log(res, 'res')
      ridesStore.quoteRide.dropoff_2 = {
        lat: res.lat,
        lon: res.long,
        name: res.name,
        type: res.type,
      }
    })
  } else {
    ridesStore.quoteRide.dropoff_2 = location
  }
}

function changeTime(time: string) {
  //convert time 03:00 AM to iso format
  ridesStore.quoteRide.time_1 = time
  //ridesStore.quoteRide.time_1
  //console.log('time',time)
}
function changeTime1(time: string) {
  //convert time 03:00 AM to iso format
  ridesStore.quoteRide.time_2 = time
  //ridesStore.quoteRide.time_1
  //console.log('time',time)
}
</script>
<template>
  <div class="row" style="gap: 8px; width: 100%; height: 44px">
    <locations-input
      :label="$t('texts.pickup')"
      type="from"
      @change="setFrom"
    />
    <locations-input :label="$t('texts.dropoff')" type="to" @change="setTo" />
    <div class="col row" style="gap: 8px">
      <q-input
        v-model="ridesStore.quoteRide.date_1"
        filled
        square
        dense
        mask="date"
        :rules="['date']"
        class="col"
        :label="$t('texts.day')"
      >
        <template #append>
          <q-icon
            name="fa drv-calendar"
            class="cursor-pointer"
            @click="calendar = true"
          >
          </q-icon>
        </template>
        <q-popup-proxy v-model="calendar">
          <q-date
            v-model="ridesStore.quoteRide.date_1"
            minimal
            :options="isDateValid"
          >
            <div class="row items-center">
              <q-btn
                v-close-popup
                color="primary"
                text-color="white"
                :label="$t('buttons.save')"
                no-caps
                class="button_"
                style="width: 100%"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-input>

      <timePicker
        :increment="5"
        :label="$t('texts.time')"
        @change="changeTime"
      />
    </div>
  </div>

  <div
    v-if="props.typeSel?.val == 1"
    class="row"
    style="gap: 8px; width: 100%; height: 44px"
  >
    <locations-input label="Pick up" type="from" @change="setFrom2" />
    <locations-input label="Drop off" type="to" @change="setTo2" />
    <div class="col row" style="gap: 8px">
      <q-input
        v-model="ridesStore.quoteRide.date_2"
        filled
        square
        dense
        mask="date"
        :rules="['date']"
        class="col"
        :label="$t('texts.day')"
      >
        <template #append>
          <q-icon
            name="fa drv-calendar"
            class="cursor-pointer"
            @click="calendar1 = true"
          >
          </q-icon>
        </template>
        <q-popup-proxy v-model="calendar1">
          <q-date
            v-model="ridesStore.quoteRide.date_2"
            minimal
            :options="isDateValid"
          >
            <div class="row items-center">
              <q-btn
                v-close-popup
                color="primary"
                text-color="white"
                :label="$t('buttons.save')"
                no-caps
                class="button_"
                style="width: 100%"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-input>

      <timePicker
        :increment="5"
        :label="$t('texts.time')"
        @change="changeTime1"
      />
    </div>
  </div>
</template>

<style scoped>
.icons {
  z-index: 99;
}

.button_ {
  font-size: 15px;
  font-weight: 400px !important;
}
</style>
