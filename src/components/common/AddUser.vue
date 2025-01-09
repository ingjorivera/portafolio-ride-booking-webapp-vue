<script setup lang="ts">
import { ref } from 'vue'

import { useUiStore } from '../../store/ui'
import { useValidationsStore } from '../../store/validations_user'
import { useUserStore } from '../../store/user'
import { useFetch } from '@vueuse/core'
const env = import.meta.env

const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

const uiStore = useUiStore()
const user = useUserStore()
const validations = useValidationsStore()
//const services = useServicesStore()

const name_ = ref('')
const countrycode = ref('')
const cellphone_ = ref('')
const mail = ref('')
const label = ref('+0')
const errorPhone = ref(false)
const v$ = validations.validateInputs({
  name: name_,
  phone: cellphone_,
  email: mail,

  countrycode: countrycode
})
function setCountry(val: string) {
  //console.log('entra')
  label.value = ''
}
async function checkPhone() {
  ////console.log(countrycode.value,'countrycode.value')
  //check if phone number is a number
  if (v$.value.phone.$model.length > 5 && countrycode.value) {
    if (v$.value.phone.$model.match(/^\d+$/)) {
      await uiStore.validatePhone(v$.value.phone.$model, user.token, countrycode.value.phoneCode)
    }
    // else{

    // }
  }
}

async function createProfile(
  name: string,
  email: string,
  phone: string,
  mobile: string,
  username: string | null
) {
  //remove + from phone number
  phone = phone.replace('+', '')
  mobile = mobile.replace('+', '')
  console.log('entra a crear')
  uiStore.isLoading = true
  const { error, data } = await useFetch(API_URL + '/staffs', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
    .post({
      name: name,
      email: email,
      phone: phone,
      mobile: mobile,
      username: username
    })
    .json()
  if (error.value) {
    uiStore.isError = true
    uiStore.isLoading = false
    uiStore.errorMessage = 'Error creating staff'
    uiStore.createNotification(uiStore.errorMessage, 'negative', 'top', 'drv-alert-triangle')
    //console.log(error.value);
  } else {
    uiStore.isLoading = false
    uiStore.createNotification('Created successfully', 'positive', 'top', 'drv-check-square-broken')
    //console.log(data.value);

    // this.listStaffs=data.value
  }
}
</script>
<template>
  <div class="add_user column">
    <q-input
      v-model="v$.name.$model"
      filled
      square
      dense
      :label="uiStore.translationsUI.modal_whos_there[5][uiStore.langSelected]"
    />
    <div
      v-if="v$.name.$error && v$.name.$dirty && v$.name.$model != ''"
      class="error row items-center"
      style="gap: 8px"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="18" rx="9" fill="#BF3032" />
        <path
          d="M9 7.52649V9.08542M9 10.6444H9.0039M8.46034 5.53562L5.25483 11.0724C5.07703 11.3795 4.98813 11.5331 5.00127 11.6591C5.01273 11.769 5.07032 11.8689 5.15971 11.9339C5.2622 12.0084 5.43963 12.0084 5.79449 12.0084H12.2055C12.5604 12.0084 12.7378 12.0084 12.8403 11.9339C12.9297 11.8689 12.9873 11.769 12.9987 11.6591C13.0119 11.5331 12.923 11.3795 12.7452 11.0724L9.53966 5.53562C9.3625 5.22962 9.27392 5.07661 9.15835 5.02523C9.05754 4.9804 8.94246 4.9804 8.84165 5.02523C8.72608 5.07661 8.6375 5.22962 8.46034 5.53562Z"
          stroke="white"
          stroke-width="0.5"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
      </svg>
      <div>{{ uiStore.translationsUI.modal_whos_there[11][uiStore.langSelected] }}</div>
    </div>
    <div class="row" style="gap: 1px">
      <q-select
        v-model="countrycode"
        dropdown-icon="fas drv-chevron-down"
        square
        dense
        filled
        :label="label"
        :options="uiStore.api_countries_sorted_phoneCodes"
        option-label="phoneCode"
        option-value="phoneCode"
        style="width: 70px"
        @update:model-value="setCountry"
      />
      <q-input
        v-model="v$.phone.$model"
        square
        dense
        filled
        :label="uiStore.translationsUI.modal_whos_there[6][uiStore.langSelected]"
        style="width: calc(100% - 71px)"
        @blur="checkPhone"
      />
    </div>
    <div v-if="!uiStore.valid_phone" class="error row items-center" style="gap: 8px">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="18" rx="9" fill="#BF3032" />
        <path
          d="M9 7.52649V9.08542M9 10.6444H9.0039M8.46034 5.53562L5.25483 11.0724C5.07703 11.3795 4.98813 11.5331 5.00127 11.6591C5.01273 11.769 5.07032 11.8689 5.15971 11.9339C5.2622 12.0084 5.43963 12.0084 5.79449 12.0084H12.2055C12.5604 12.0084 12.7378 12.0084 12.8403 11.9339C12.9297 11.8689 12.9873 11.769 12.9987 11.6591C13.0119 11.5331 12.923 11.3795 12.7452 11.0724L9.53966 5.53562C9.3625 5.22962 9.27392 5.07661 9.15835 5.02523C9.05754 4.9804 8.94246 4.9804 8.84165 5.02523C8.72608 5.07661 8.6375 5.22962 8.46034 5.53562Z"
          stroke="white"
          stroke-width="0.5"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
      </svg>
      <div>{{ uiStore.translationsUI.modal_whos_there[8][uiStore.langSelected] }}</div>
    </div>

    <q-input
      v-model="v$.email.$model"
      filled
      square
      dense
      :label="uiStore.translationsUI.modal_whos_there[7][uiStore.langSelected]"
    />
    <div
      v-if="v$.email.$error && v$.email.$dirty && v$.email.$model != ''"
      class="error row items-center"
      style="gap: 8px"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="18" rx="9" fill="#BF3032" />
        <path
          d="M9 7.52649V9.08542M9 10.6444H9.0039M8.46034 5.53562L5.25483 11.0724C5.07703 11.3795 4.98813 11.5331 5.00127 11.6591C5.01273 11.769 5.07032 11.8689 5.15971 11.9339C5.2622 12.0084 5.43963 12.0084 5.79449 12.0084H12.2055C12.5604 12.0084 12.7378 12.0084 12.8403 11.9339C12.9297 11.8689 12.9873 11.769 12.9987 11.6591C13.0119 11.5331 12.923 11.3795 12.7452 11.0724L9.53966 5.53562C9.3625 5.22962 9.27392 5.07661 9.15835 5.02523C9.05754 4.9804 8.94246 4.9804 8.84165 5.02523C8.72608 5.07661 8.6375 5.22962 8.46034 5.53562Z"
          stroke="white"
          stroke-width="0.5"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
      </svg>
      <div>{{ uiStore.translationsUI.modal_whos_there[9][uiStore.langSelected] }}</div>
    </div>
  </div>

  <q-btn
    unelevated
    square
    padding="sm"
    class="bg-primary"
    text-color="white"
    no-caps
    style="width: 100%; margin-top: 16px"
    :loading="uiStore.isLoading"
    :disable="
      uiStore.isLoading ||
      v$.name.$error ||
      !uiStore.valid_phone ||
      v$.email.$error ||
      v$.name.$model == '' ||
      v$.phone.$model == '' ||
      v$.email.$model == '' ||
      countrycode == ''
    "
    label="Confirm"
    @click="
      createProfile(
        v$.name.$model,
        v$.email.$model,
        countrycode.phoneCode + v$.phone.$model,
        countrycode.phoneCode + v$.phone.$model,
        ''
      )
    "
  />
</template>
<style scoped>
.add_user {
  border-top: 1px solid #ccc7bf;
  padding: 8px 0px 0px 0px;
  gap: 8px;
}
div {
  border-radius: 0px !important;
}
.error {
  color: #bf3032;
  font-size: 12px;
}
</style>
