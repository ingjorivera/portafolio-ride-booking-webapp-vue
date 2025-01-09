<script setup lang="ts">
import { ref } from 'vue'
import { useRidesStore, useUiStore } from '@/store'

const emit = defineEmits({
  change: null
})

const ridesStore = useRidesStore()
const uiStore = useUiStore()

const props = defineProps({
  index: Number
})

const fullName = ref(ridesStore.passengersNotifications[props.index].name)
const email = ref(ridesStore.passengersNotifications[props.index].email)
const phone = ref(ridesStore.passengersNotifications[props.index].phone)
const fullPhone = ref(uiStore.separateCountryCodeAndPhone(phone.value))
console.log(fullPhone, 'fullPhone')
function setValues() {
  const phoneNormalized = fullPhone.value.countryCode.replace('+', '') + fullPhone.value.phoneNumber
  ridesStore.passengersNotifications[props.index].name = fullName.value
  ridesStore.passengersNotifications[props.index].email = email.value
  ridesStore.passengersNotifications[props.index].phone = phoneNormalized

  emit('change')
}
</script>
<template>
  <div class="column" style="gap: 10px; padding-top: 8px">
    <q-input v-model="fullName" dense filled label="Full name" />
    <q-input v-model="email" dense filled label="Email" />
    <div class="row" style="gap: 1px">
      <q-input v-model="fullPhone.countryCode" dense filled label="+34" style="width: 56px" />
      <q-input v-model="fullPhone.phoneNumber" dense filled class="col" label="Cell phone" />
    </div>
  </div>
  <q-btn
    unelevated
    color="primary"
    label="Save"
    no-caps
    style="width: 100%; margin-top: 16px"
    @click="setValues"
  />
</template>

<style scoped>
.error {
  font-size: 12px;
  color: #bf3032;
}
</style>
