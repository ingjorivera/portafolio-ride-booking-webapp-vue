<script setup lang="ts">
import { useRidesStore } from '../../../../../store'
import { ref } from 'vue'
const percentage = ref(0)
const ridesStore = useRidesStore()
function calculateCommission() {
  //only two digits

  percentage.value = (
    (100 * ridesStore.mySettings.managementFee) /
    ridesStore.selectedVehicles[0].totalSalesPrice
  ).toFixed(2)
}
</script>
<template>
  <div class="column">
    <div class="row">
      <div class="column col" style="gap: 4px">
        <div class="title">Booking ID</div>
        <div class="subtitle">Enter your code or keyword to identify your ride</div>
      </div>
      <q-input
        v-model="ridesStore.mySettings.bookingID"
        dense
        class="col"
        filled
        label="Reservation ID"
      />
    </div>
    <div class="row">
      <div class="column col" style="gap: 4px">
        <div class="title">Management fee</div>
        <div class="subtitle">Enter the commission you charge for this booking</div>
      </div>
      <div class="column col" style="gap: 4px">
        <q-input
          v-model="ridesStore.mySettings.managementFee"
          dense
          class="col"
          filled
          label="Added commission"
          @update:model-value="calculateCommission"
        >
          <template #append>
            <div class="subtitle">+{{ percentage }}%</div>
          </template>
        </q-input>
        <div class="info" style="text-align: right">
          Commission reduces proportionally with partial cancellation.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 18px;
  color: #2e2e33;
  line-height: 19.8px;
}
.subtitle {
  font-size: 15px;
  color: #747477;
  line-height: 19.5px;
}
.info {
  font-size: 10px;
  color: #747477;
}
</style>
