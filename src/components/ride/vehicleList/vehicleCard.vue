<script setup lang="ts">
import { useUiStore } from '@/store'
import type { Vehicle } from '../../../types/quotesResult'
const props = defineProps<{
  vehicle: Vehicle
  special: boolean
}>()

const uiStore = useUiStore()
</script>
<template>
  <div class="column justify-between vehicleCard">
    <div class="column">
      <div class="category" style="text-transform: uppercase">
        {{ props.vehicle.vehicle.level_of_service.name }}
      </div>
      <div class="class">{{ props.vehicle.vehicle.vehicle_class.name }}</div>
    </div>
    <div>
      <img
        :src="
          props.vehicle.vehicle.vehicle_class.name == 'Sedan'
            ? '/mockup/Sedan.png'
            : '/mockup/Minivan.png'
        "
        style="width: 100%; height: 200px; object-fit: contain"
      />
    </div>
    <div class="row justify-between items-center">
      <div class="from">
        {{ special ? '' : 'From' }} {{ props.vehicle.totalSalesPrice
        }}{{ uiStore.currency.symbol }}
      </div>
      <div class="row" style="gap: 12px; color: #58585c">
        <div class="row items-center" style="gap: 4px">
          <i class="drv-users-03" style="font-size: 16px"></i>
          <div class="icons">{{ props.vehicle.vehicle.pax }}</div>
        </div>

        <div class="row items-center" style="gap: 4px">
          <i class="drv-luggage-03" style="font-size: 16px"></i>

          <div class="icons">{{ props.vehicle.vehicle.suitcase }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.vehicleCard {
  padding: 16px;
  background-color: #f8f6f4;
  min-height: 420px;
}
.category {
  font-size: 15px;
  line-height: 130%;
  /* or 19px */
  letter-spacing: -0.01em;
  color: #747477;
}
.class {
  font-size: 25px;
  line-height: 110%;
  /* identical to box height, or 28px */
  letter-spacing: -0.01em;

  /* Primary/Blue */
  color: #2e2e33;
}
.from {
  /* From 251.50€ */

  font-size: 18px;
  line-height: 110%;
  /* identical to box height, or 20px */
  letter-spacing: -0.01em;

  /* Primary/Blue */
  color: #2e2e33;
}
.icons {
  font-size: 15px;
}
</style>
