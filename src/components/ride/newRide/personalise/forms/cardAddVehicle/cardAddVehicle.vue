<script setup lang="ts">
import { ref } from 'vue'
import numberInput from '../../../../../common/numberInput.vue'

const popup = ref(false)

const passengers = ref(0)
const baby_seats = ref(0)
const child_boosters = ref(0)
</script>
<template>
  <div class="column justify-between vehicleCard">
    <div class="column">
      <div class="category">BUSINESS</div>
      <div class="class">Sedan</div>
    </div>
    <div></div>
    <div class="row justify-between items-center">
      <div class="from">From 251.50</div>
      <div class="row" style="gap: 12px">
        <div class="row items-center" style="gap: 4px">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4999 10.5579C13.4705 11.0455 14.3026 11.828 14.9101 12.8064C15.0303 13.0002 15.0905 13.0971 15.1113 13.2312C15.1535 13.5038 14.9671 13.839 14.7132 13.9469C14.5882 14 14.4477 14 14.1666 14M11.1666 7.68816C12.1544 7.19726 12.8332 6.17791 12.8332 5C12.8332 3.82209 12.1544 2.80274 11.1666 2.31184M9.83322 5C9.83322 6.65685 8.49008 8 6.83322 8C5.17637 8 3.83322 6.65685 3.83322 5C3.83322 3.34315 5.17637 2 6.83322 2C8.49008 2 9.83322 3.34315 9.83322 5ZM2.20604 12.6256C3.26892 11.0297 4.94614 10 6.83322 10C8.72031 10 10.3975 11.0297 11.4604 12.6256C11.6932 12.9752 11.8097 13.15 11.7963 13.3733C11.7858 13.5471 11.6719 13.76 11.5329 13.8651C11.3545 14 11.1091 14 10.6183 14H3.04813C2.55734 14 2.31194 14 2.13352 13.8651C1.99459 13.76 1.88062 13.5471 1.87018 13.3733C1.85678 13.15 1.9732 12.9752 2.20604 12.6256Z"
              stroke="#58585C"
              stroke-width="0.8"
              stroke-linecap="square"
              stroke-linejoin="bevel"
            />
          </svg>
          <div class="icons">2</div>
        </div>
        <div class="row items-center" style="gap: 4px">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83398 14V4.66667C5.83398 4.04669 5.83398 3.7367 5.90213 3.48236C6.08707 2.79218 6.62616 2.25308 7.31635 2.06815C7.57068 2 7.88067 2 8.50065 2C9.12063 2 9.43062 2 9.68496 2.06815C10.3751 2.25308 10.9142 2.79218 11.0992 3.48236C11.1673 3.7367 11.1673 4.04669 11.1673 4.66667V9M11.1673 11.6667V14M5.03398 14H11.9673C13.0874 14 13.6475 14 14.0753 13.782C14.4516 13.5903 14.7576 13.2843 14.9493 12.908C15.1673 12.4802 15.1673 11.9201 15.1673 10.8V7.86667C15.1673 6.74656 15.1673 6.18651 14.9493 5.75869C14.7576 5.38236 14.4516 5.0764 14.0753 4.88465C13.6475 4.66667 13.0874 4.66667 11.9673 4.66667H5.03398C3.91388 4.66667 3.35383 4.66667 2.926 4.88465C2.54968 5.0764 2.24372 5.38236 2.05197 5.75869C1.83398 6.18651 1.83398 6.74656 1.83398 7.86667V10.8C1.83398 11.9201 1.83398 12.4802 2.05197 12.908C2.24372 13.2843 2.54968 13.5903 2.926 13.782C3.35383 14 3.91388 14 5.03398 14ZM9.03398 11.6667H12.3007C12.4873 11.6667 12.5807 11.6667 12.652 11.6303C12.7147 11.5984 12.7657 11.5474 12.7977 11.4847C12.834 11.4134 12.834 11.32 12.834 11.1333V9.53333C12.834 9.34665 12.834 9.25331 12.7977 9.182C12.7657 9.11928 12.7147 9.06829 12.652 9.03633C12.5807 9 12.4873 9 12.3007 9H9.03398C8.8473 9 8.75396 9 8.68265 9.03633C8.61993 9.06829 8.56894 9.11928 8.53698 9.182C8.50065 9.25331 8.50065 9.34665 8.50065 9.53333V11.1333C8.50065 11.32 8.50065 11.4134 8.53698 11.4847C8.56894 11.5474 8.61993 11.5984 8.68265 11.6303C8.75396 11.6667 8.8473 11.6667 9.03398 11.6667Z"
              stroke="#58585C"
              stroke-width="0.8"
              stroke-linecap="square"
              stroke-linejoin="bevel"
            />
          </svg>

          <div class="icons">2</div>
        </div>
      </div>
    </div>
    <div v-if="!popup" class="popup_selector" @click="popup = true"></div>
    <div v-if="popup" class="popup column justify-center items-center fit">
      <div class="bg-white column" style="padding: 12px; width: 340px; gap: 16px">
        <div class="row justify-between items-center">
          <div>Sedan</div>
          <div>250.50€</div>
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
              <q-input v-model="child_boosters" filled class="col" dense label="Child boosters" />
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
          @click="popup = false"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.vehicleCard {
  padding: 16px;
  background-color: #f8f6f4;
  min-height: 420px;
  border: 1px solid #ccc7bf;
}

.category {
  font-size: 15px;
  font-weight: 400;
}
.class {
  font-size: 25px;
}
.from {
  font-size: 18px;
}
.icons {
  font-size: 15px;
}
.popup {
  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.262);
  z-index: 99;
}
.popup_selector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 99;
}
</style>
