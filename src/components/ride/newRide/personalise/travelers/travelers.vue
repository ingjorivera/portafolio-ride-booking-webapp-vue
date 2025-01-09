<script setup lang="ts">
import numberInput from '../../../../common/numberInput.vue'
import phoneInput from '../../../../common/phoneInput.vue'

import { useRidesStore, useUiStore, useAuthStore } from '@/store'
import { useUserStore } from '@/store/user'
import { ref, provide } from 'vue'
import PassengersInput from '@/components/common/passengersInput.vue'
import { PassengerRes } from '@/types/passengers'
const user = useUserStore()
const auth = useAuthStore()
const uiStore = useUiStore()
const ridesStore = useRidesStore()

const num_travelers = ref(0)
const baby_seats = ref(0)
const child_boosters = ref(0)
const aditional = ref('')
const label = ref('+0')
const errorPhone = ref(false)
let countryCode = ref('')
let phone = ref('')
let disabled = ref(true)
let variables = ref({
  phone: phone,
  countrycode: countryCode
})
provide('traveler_data', variables)

function setCountry(val: string) {
  //console.log('entra')
  label.value = ''
}
async function checkPhone() {
  console.log(countryCode.value.phoneCode, 'countrycode.value')
  ////console.log(countrycode.value,'countrycode.value')
  //check if phone number is a number
  if (ridesStore.passengerDetails.cellphone.length > 5 && countryCode.value['phoneCode']) {
    if (ridesStore.passengerDetails.cellphone.match(/^\d+$/)) {
      await uiStore
        .validatePhone(
          ridesStore.passengerDetails.cellphone,
          auth.token,
          countryCode.value.phoneCode,
          'mobile'
        )
        .then(() => {
          console.log(uiStore.valid_phone, 'uiStore.valid_phone')
          if (uiStore.valid_phone) {
          } else {
            uiStore.createNotification(
              'Traveler phone number is not valid',
              'negative',
              'top',
              'drv-alert-triangle'
            )
          }
        })
    }
    // else{

    // }
  }
}
function updateData(model: PassengerRes) {
  //disabled.value = true
  phone.value = uiStore.separateCountryCodeAndPhone(model.phone).phoneNumber
  countryCode.value = uiStore.separateCountryCodeAndPhone(model.phone).countryCode
  ridesStore.passengerDetails.fullName = model.name
  ridesStore.passengerDetails.email = model.email
  ridesStore.passengerDetails.cellphone = uiStore.separateCountryCodeAndPhone(
    model.phone
  ).phoneNumber
  ridesStore.passengerDetails.countryCode = uiStore.separateCountryCodeAndPhone(
    model.phone
  ).countryCode
  ridesStore.passengerDetails.id = model.id
}
function addContact(model: any) {
  console.log(model)
  countryCode.value = ''
  phone.value = ''
  ridesStore.passengerDetails = {
    fullName: model.value,
    email: '',
    countryCode: '',
    cellphone: '',
    numTravelers: 0,
    babySeats: 0,
    childBoosters: 0,
    aditional: '',
    id: 0
  }
}
</script>
<template>
  <div class="column" style="gap: 8px">
    <div>PASSENGER DETAILS</div>
    <div class="column" style="gap: 10px">
      <div class="row" style="gap: 10px">
        <passengers-input class="col" :label="'Full name'" @change="updateData" @add="addContact" />

        <q-input
          v-model="ridesStore.passengerDetails.email"
          class="col"
          filled
          dense
          label="Email address"
          style="width: calc((100% / 3) - 7px)"
        />

        <phone-input
          label="Cellphone"
          :type="'mobile'"
          style="width: calc((100% / 3) - 7px)"
          v-model:countryCode="ridesStore.passengerDetails.countryCode"
          v-model:phone="ridesStore.passengerDetails.cellphone"
        />
      </div>
      <div class="row" style="gap: 10px">
        <div class="row" style="width: calc((100% / 3) - 7px)">
          <q-input
            v-model="ridesStore.passengerDetails.numTravelers"
            filled
            class="col"
            dense
            label="Number of travelers"
          />
          <number-input
            :value="ridesStore.passengerDetails.numTravelers"
            @change="ridesStore.passengerDetails.numTravelers = $event"
          />
        </div>

        <div class="row" style="width: calc((100% / 3) - 7px)">
          <q-input
            v-model="ridesStore.passengerDetails.babySeats"
            filled
            class="col"
            dense
            label="Baby seats"
          />
          <number-input
            :value="ridesStore.passengerDetails.babySeats"
            @change="ridesStore.passengerDetails.babySeats = $event"
          />
        </div>
        <div class="row" style="width: calc((100% / 3) - 7px)">
          <q-input
            v-model="ridesStore.passengerDetails.childBoosters"
            filled
            class="col"
            dense
            label="Child boosters"
          />
          <number-input
            :value="ridesStore.passengerDetails.childBoosters"
            @change="ridesStore.passengerDetails.childBoosters = $event"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="column" style="gap: 8px; padding-bottom: 16px">
    <div>ADDITIONAL INFORMATION</div>
    <q-input
      v-model="ridesStore.passengerDetails.aditional"
      class="col"
      filled
      dense
      label="Add your comments here"
    />
  </div>
</template>
