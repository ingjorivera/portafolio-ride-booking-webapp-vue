<script setup lang="ts">
import { ref } from 'vue'
import locationsInput from '../../../common/locationsInput.vue'
import { Location } from '@/types/rides'
import { useUserStore } from '../../../../store/user'
import timePicker from '../../../common/timePicker.vue'

const props = defineProps({
  typeSel: Number
})

const user = useUserStore()

const date = ref('')
const time = ref('')
const hour_popup = ref(false)
const hours = ref(8)
const minutes = ref(0)
const ampm = ref('AM')

const calendar = ref(false)

function changeHours(direction: string) {
  if (direction == 'up') {
    if (hours.value < 14) hours.value = hours.value + 1
  } else {
    if (hours.value > 8) hours.value = hours.value - 1
  }

  time.value = hours.value + ':' + minutes.value
  user.quoteRide.time_1 = hours.value + ':' + minutes.value
}
function changeMinutes(direction: string) {
  if (direction == 'up') {
    if (minutes.value < 45) minutes.value = minutes.value + 15
  } else {
    if (minutes.value > 0) minutes.value = minutes.value - 15
  }
  time.value = hours.value + ':' + minutes.value
  user.quoteRide.time_1 = hours.value + ':' + minutes.value
}
function setFrom(location: Location) {
  user.quoteRide.pickup_1 = location
}
function setTo(location: Location) {
  user.quoteRide.dropoff_1 = location
}
function setFrom2(location: Location) {
  user.quoteRide.pickup_2 = location
}
function setTo2(location: Location) {
  user.quoteRide.dropoff_2 = user.quoteRide.pickup_1
}

function setTime1(time: string) {
  user.quoteRide.time_1 = time
}
function setTime2(time: string) {
  user.quoteRide.time_2 = time
}
</script>
<template>
  <div class="column" style="gap: 24px">
    <div class="row" style="gap: 8px; padding: 16px 16px 24px; background-color: #f8f6f4">
      <div class="column col" style="gap: 8px">
        <div style="font-size: 12px">FROM</div>
        <locations-input label="Pick up" type="from" @change="setFrom" />
        <div class="row" style="gap: 8px">
          <q-input
            v-model="user.quoteRide.date_1"
            filled
            square
            dense
            mask="date"
            :rules="['date']"
            class="col"
            label="Día"
          >
            <template #append>
              <q-icon name="fa drv-calendar" class="cursor-pointer" @click="calendar = true">
              </q-icon>
            </template>
            <q-popup-proxy v-model="calendar">
              <q-date v-model="user.quoteRide.date_1" minimal>
                <div class="row items-center">
                  <q-btn
                    v-close-popup
                    color="primary"
                    text-color="white"
                    label="Save"
                    no-caps
                    class="button_"
                    style="width: 100%"
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-input>

          <time-picker :label="'Pick up time'" :increment="5" @change="setTime1"></time-picker>
        </div>
      </div>
      <div class="column col" style="gap: 8px">
        <div style="font-size: 12px">TO</div>
        <locations-input label="Drop off" type="to" @change="setTo" />
        <div class="row" style="gap: 8px">
          <time-picker
            :label="'Drop off time'"
            :increment="5"
            class="col-6"
            @change="setTime2"
          ></time-picker>
        </div>
      </div>
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
