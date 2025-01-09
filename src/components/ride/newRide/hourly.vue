<script setup lang="ts">
import { useQuasar } from 'quasar'

import { ref } from 'vue'
import formRideHourly from './form/formRideHourly.vue'
import { useServicesStore } from '../../../store/services'
import { useUiStore } from '../../../store/ui'
import { useUserStore } from '../../../store/user'

import router from '../../../router'

const services = useServicesStore()
const uiStore = useUiStore()
const user = useUserStore()

const $q = useQuasar()
const client = ref('Coca Cola')
const typeSel = ref('One way')
const options = ref([
  {
    label: 'Coca Cola',
    value: '00122933',
    icon: ''
  },
  {
    label: 'Pepsi',
    value: '236646456',
    icon: ''
  },
  {
    label: 'Seven UP',
    value: '34443223',
    icon: ''
  }
])
function showNotification() {
  $q.notify({
    message: 'Notification',
    color: 'primary'
  })
}

const type = ref([
  {
    label: 'One way',
    value: 0
  },
  {
    label: 'Round trip',
    value: 1
  }
])

function chageRoute(location: string) {
  router.push(location)
}

async function getRequest() {
  const request = await services.quoteRequest(2)
  if (request) {
    chageRoute('/rides/new/quote_hourly')
  }
}
</script>
<template>
  <div class="column" style="gap: 24px">
    <div class="row" style="gap: 8px">
      <div class="bg-secondary col column" style="gap: 8px">
        <formRideHourly></formRideHourly>
      </div>
      <div class="bg-secondary column module col-2">
        <div>CLIENT</div>
        <q-select
          v-model="client"
          style="width: 100%"
          bg-color="white"
          square
          filled
          label="Clien name"
          :options="options"
          dense
          dropdown-icon="fa drv-chevron-down"
        ></q-select>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="row" style="gap: 8px">
        <i class="drv-alert-circle" style="font-size: 20px"></i>
        <div>You'll be able to add intermediate stops before the final step.</div>
      </div>
      <q-btn
        :disable="
          uiStore.isLoading ||
          user.quoteRide.pickup_1.name == '' ||
          user.quoteRide.dropoff_1.name == '' ||
          user.quoteRide.time_1 == '' ||
          user.quoteRide.date_1 == '' ||
          user.quoteRide.time_2 == ''
        "
        :loading="uiStore.isLoading"
        color="primary"
        text-color="white"
        label="Quote ride"
        no-caps
        class="button_"
        @click="getRequest()"
      >
      </q-btn>
    </div>
  </div>
</template>
<style scoped>
.button_ {
  font-size: 15px;
  font-weight: 400px !important;
  width: 446px;
}
.module {
  padding: 16px 16px 24px 16px;
  gap: 8px;
  font-size: 12px;
}
</style>
