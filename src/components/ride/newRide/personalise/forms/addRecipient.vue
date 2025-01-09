<script setup lang="ts">
import { ref } from 'vue'
import phoneInput from '@/components/common/phoneInput.vue'
import { useUiStore, useRidesStore } from '@/store'
import contactsInput from '@/components/common/contactsInput.vue'
const uiStore = useUiStore()
const ridesStore = useRidesStore()
import { Action, ContactsRes } from '@/types/contactsRes'

const emit = defineEmits({
  change: null
})

const fullName = ref('')
let email = ref('')
let phone = ref('')
let countrycode = ref('')
let id = ref()
let contact = ref<ContactsRes>({
  role_id: '',
  role_name: '',
  name: '',
  email: '',
  phone: '',
  recipient: '',
  actions: [],
  id: '',
  client_id: 0,
  per_service: false
})

function setValues() {
  if (id.value == null) {
    ridesStore.addPassengerNotification({
      role_id: '',
      role_name: '',
      name: fullName.value,
      email: email.value,
      phone: phone.value,
      recipient: '',
      actions: [
        { pattern: 'Reservation', name: 'BookingQuotation', email: false, sms: false },
        { pattern: 'Reservation', name: 'BookingConfirmation', email: false, sms: false },
        { pattern: 'Reservation', name: 'BookingConfirmationChange', email: false, sms: false },
        { pattern: 'Reservation', name: 'BookingPriceRequest', email: false, sms: false },
        { pattern: 'Reservation', name: 'BookingCancellation', email: false, sms: false },
        { pattern: 'Reservation', name: 'BookingChauffeurDetail', email: false, sms: false },
        { pattern: 'Service', name: 'OnMyWay', email: false, sms: false },
        { pattern: 'Service', name: 'DriverOnLocation', email: false, sms: false },
        { pattern: 'Service', name: 'PassengerOnBoard', email: false, sms: false },
        { pattern: 'Service', name: 'DropOff', email: false, sms: false },
        { pattern: 'Service', name: 'EtaUpdate', email: false, sms: false },
        { pattern: 'Billing', name: 'SendInvoice', email: false, sms: false }
      ],
      id: '',
      client_id: null,
      per_service: false
    })
  } else {
    ridesStore.addPassengerNotification(contact.value)
  }

  emit('change')
}
function changeData(data: ContactsRes) {
  contact.value = data
  email.value = data.email
  phone.value = uiStore.separateCountryCodeAndPhone(data.phone).phoneNumber
  countrycode.value = uiStore.separateCountryCodeAndPhone(data.phone).countryCode
  id.value = data.client_id
  fullName.value = data.name
  console.log(fullName.value, 'name')
}
function addData(data: any) {
  email.value = ''
  phone.value = ''
  countrycode.value = ''
  id.value = null
}
</script>
<template>
  <div class="column" style="gap: 10px; padding-top: 8px">
    <!--    <q-input v-model="fullName" dense filled label="Full name" />-->
    <contacts-input label="Name" @change="changeData" @add="addData" />
    <q-input v-model="email" dense filled label="Email" />
    <phone-input
      label="Cellphone"
      :type="'mobile'"
      v-model:country-code="countrycode"
      v-model:phone="phone"
    />
    <div v-if="!email || !phone || !uiStore.valid_phone" class="row" style="gap: 7px">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="18" rx="9" fill="#BF3032" />
        <path
          d="M9 7.52658V9.08551M9 10.6444H9.0039M8.46034 5.53571L5.25483 11.0725C5.07703 11.3796 4.98813 11.5332 5.00127 11.6592C5.01273 11.7691 5.07032 11.869 5.15971 11.934C5.2622 12.0085 5.43963 12.0085 5.79449 12.0085H12.2055C12.5604 12.0085 12.7378 12.0085 12.8403 11.934C12.9297 11.869 12.9873 11.7691 12.9987 11.6592C13.0119 11.5332 12.923 11.3796 12.7452 11.0725L9.53966 5.53571C9.3625 5.22971 9.27392 5.07671 9.15835 5.02532C9.05754 4.98049 8.94246 4.98049 8.84165 5.02532C8.72608 5.07671 8.6375 5.22971 8.46034 5.53571Z"
          stroke="white"
          stroke-width="0.5"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
      </svg>
      <div class="error col">
        A new recipient cannot be created without an email address or phone number. Please provide
        at least one of these.
      </div>
    </div>
  </div>
  <q-btn
    unelevated
    color="primary"
    label="Add"
    no-caps
    style="width: 100%; margin-top: 16px"
    :disabled="!email || !phone || !uiStore.valid_phone"
    @click="setValues"
  />
</template>

<style scoped>
.error {
  font-size: 12px;
  color: #bf3032;
}
</style>
