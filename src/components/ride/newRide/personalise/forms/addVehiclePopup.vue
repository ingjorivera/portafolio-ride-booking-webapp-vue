<script setup lang="ts">
import cardAddVehicle from './cardAddVehicle/cardAddVehicle.vue'
import numberInput from '../../../../common/numberInput.vue'

import { ref } from 'vue'
import { useScroll } from '@vueuse/core'

import vehicleCard from '../../../vehicleList/vehicleCard.vue'

import { useUserStore } from '../../../../../store/user'

const emit = defineEmits({
  change: null
})

const user = useUserStore()

const passengers = ref(0)
const baby_seats = ref(0)
const child_boosters = ref(0)
const optionSel = ref('option')

function showOptions(i: number) {
  passengers.value = 0
  baby_seats.value = 0
  child_boosters.value = 0
  optionSel.value = 'option' + i
}
function addVehicle(car) {
  console.log(car, 'car-------')

  user.addCar(car)
  emit('change')
}
</script>
<template>
  <q-scroll-area style="height: 500px; width: 100%">
    <div class="row wrap" style="width: 100%; gap: 8px">
      <template v-for="(vehicle, i) in user.quoteRes[0].vehicles">
        <div class="vehicleCard" style="position: relative">
          <vehicleCard :vehicle="vehicle" class="vehicleCard" @click="showOptions(i)" />
          <div v-if="optionSel == 'option' + i" class="overlay row justify-center items-center">
            <div class="popup">
              <div class="bg-white column" style="padding: 12px; width: 340px; gap: 16px">
                <div class="row justify-between items-center">
                  <div style="font-size: 18px">{{ vehicle.vehicle.vehicle_class.name }}</div>
                  <div style="font-size: 24px">{{ vehicle.totalSalesPrice.toFixed(2) }}€</div>
                </div>
                <div class="column" style="gap: 8px">
                  <div class="row col">
                    <q-input v-model="passengers" filled class="col" dense label="Passengers" />
                    <number-input :value="passengers" @change="passengers = $event" />
                  </div>
                  <div class="row" style="gap: 10px">
                    <div class="row col">
                      <q-input v-model="baby_seats" filled class="col" dense label="Baby seats" />
                      <number-input :value="baby_seats" @change="baby_seats = $event" />
                    </div>
                    <div class="row col">
                      <q-input
                        v-model="child_boosters"
                        filled
                        class="col"
                        dense
                        label="Child boosters"
                      />
                      <number-input :value="child_boosters" @change="child_boosters = $event" />
                    </div>
                  </div>
                </div>

                <q-btn
                  unelevated
                  color="primary"
                  label="Add vehicle"
                  no-caps
                  style="width: 100%; margin-top: 16px"
                  @click="addVehicle(vehicle)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </q-scroll-area>
</template>
<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.357);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.vehicleCard {
  width: calc((100vw / 3) - 40px);
  position: relative;
}
.popup {
  background-color: #ffffff;
  width: 340px;
  height: 225px;
}
</style>
