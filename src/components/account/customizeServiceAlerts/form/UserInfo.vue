<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../../../store/modules/auth'
import { useClientsStore } from '../../../../store/modules/clients'
import { useUiStore } from '../../../../store/ui'
import { useValidationsStore } from '../../../../store/validations_user'
import type { Action, ContactsRes } from '@/types/contactsRes'

const env = import.meta.env
const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

const auth = useAuthStore()
const clientsStore = useClientsStore()
const uiStore = useUiStore()
const validations = useValidationsStore()

uiStore.valid_phone = true
uiStore.valid_mobile = true

const emit = defineEmits({
  changeEditMode: null,
  loadClient: null,
})

const props = defineProps({
  type: String,
  name: String,
  phone: String,
  code_phone: String,
  email_: String,

  id: Number,
  per_service: Boolean,
  alerts: Array<Action>,
})

const per_ser = ref(props.per_service)
const actions = ref(props.alerts)

const fullName = ref(props.type === 'edit' ? props.name : '')
const phone_ = ref(props.type === 'edit' ? props.phone : '')
const email_ = ref(props.type === 'edit' ? props.email_ : '')
const dial_code_phone = ref(props.type === 'edit' ? props.code_phone : '')

const modal_dialog_create = ref(false)
const modal_dialog_save = ref(false)
const modal_email = ref(false)
const label = ref('+0')
const contact = ref<ContactsRes>()
const v$ = validations.validateInputs({
  name: fullName,
  phone: phone_,
  email: email_,
})

async function addClient() {
  uiStore.setLoading(true)

  if (contact.value) {
    const success = await clientsStore.createContact(contact.value)

    if (success) {
      uiStore.setLoading(false)
      modal_dialog_create.value = true
    }

    uiStore.setLoading(false)
    emit('loadClient', clientsStore.clients[2])
  }
}

async function editClient() {
  uiStore.setLoading(true)

  const code = props.code_phone
    ? props.code_phone
    : dial_code_phone.value.phoneCode

  if (contact.value) {
    const success = await clientsStore.editContact(contact.value)

    if (success) {
      uiStore.setLoading(false)
      modal_dialog_save.value = true
    }

    uiStore.setLoading(false)
  }
}

function backToList() {
  emit('changeEditMode', 'edit', false)
}

function setCountry() {
  label.value = ''
}

async function checkPhone() {
  const number = phone_.value
  const code = props.code_phone || dial_code_phone.value.phoneCode

  if (number.length > 4 && code) {
    const cleanCode = code.replace('+', '')

    if (number.match(/^\d+$/)) {
      await uiStore.validatePhone(number, auth.token, cleanCode, 'phone')
    }
  }
}

const searchAlert = (searchName: string) => {
  if (!actions.value) {
    return { email: false, sms: false }
  } else {
    const alert = actions.value.find(item => item.name === searchName)
    return alert
      ? { email: alert.email, sms: alert.sms }
      : { email: false, sms: false }
  }
}
</script>

<!-- Template remains unchanged -->
<template>
  <div class="column" style="gap: 30px; width: calc(100vw - 544px)">
    <div v-if="props.type == 'edit'" class="title_form">
      {{ $t('texts.edit_recipient') }}
    </div>

    <div class="column" style="gap: 18px">
      <div class="row" style="gap: 20px; width: 100%">
        <div class="column" style="width: 100%">
          <div class="label" style="gap: 4px">
            {{ $t('texts.recipients_name') }}*
          </div>
          <q-input
            v-model="v$.name.$model"
            rounded
            dense
            outlined
            :error="v$.name.$error && v$.name.$model != ''"
          >
            <template v-if="v$.name.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.name.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="row" style="gap: 10px; width: calc(50% - 5px)">
          <div class="column">
            <div class="label" style="gap: 4px">{{ $t('texts.phone') }}</div>
            <q-select
              v-model="dial_code_phone"
              dropdown-icon="fas drv-chevron-down"
              square
              dense
              outlined=""
              :label="label"
              :options="uiStore.api_countries_sorted_phoneCodes"
              option-label="phoneCode"
              option-value="phoneCode"
              style="width: 70px"
              @update:model-value="setCountry"
            />
          </div>
          <div class="column" style="width: calc(100% - 110px)">
            <div class="label" style="gap: 4px">&nbsp;</div>
            <q-input
              v-model="v$.phone.$model"
              square
              dense
              outlined
              style="width: 100%"
              :error="!uiStore.valid_phone"
              @blur="checkPhone"
            >
              <template v-if="!uiStore.valid_phone" #append>
                <q-icon name="fa drv-alert-triangle text-negative">
                  <q-tooltip class="bg-negative" :offset="[10, 10]">
                    {{ $t('texts.phone_number_incorrect') }}
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">{{ $t('texts.email') }}*</div>
          <q-input
            v-model="v$.email.$model"
            square
            dense
            outlined
            :error="v$.email.$error && v$.email.$model != ''"
          >
            <template v-if="v$.email.$error && v$.email.$dirty" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.email.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div>
      <q-checkbox
        v-model="per_ser"
        dense
        :label="$t('texts.add_recipient_automatically')"
      />
      <div style="padding-left: 30px">
        {{ $t('texts.enabling_feature_receive_alerts') }}
      </div>
    </div>
    <div class="column" style="gap: 20px">
      <div>{{ $t('texts.recipients_alerts') }}</div>
      <div class="column" style="gap: 2px">
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">{{ $t('texts.pre_boarding_alerts') }}</div>
            <div class="row item justify-center items-center">
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.05 12.75L13.0714 7.5M7.92857 7.5L1.95003 12.75M1.5 3.125L8.84843 8.12601C9.44348 8.53098 9.74101 8.73346 10.0646 8.81189C10.3505 8.88117 10.6495 8.88117 10.9354 8.81189C11.259 8.73346 11.5565 8.53098 12.1516 8.12601L19.5 3.125M5.82 14.5H15.18C16.6921 14.5 17.4482 14.5 18.0258 14.2139C18.5338 13.9622 18.9469 13.5607 19.2057 13.0667C19.5 12.5052 19.5 11.7701 19.5 10.3V4.7C19.5 3.22986 19.5 2.49479 19.2057 1.93327C18.9469 1.43935 18.5338 1.03778 18.0258 0.786108C17.4482 0.5 16.6921 0.5 15.18 0.5H5.82C4.30786 0.5 3.55179 0.5 2.97423 0.786108C2.46619 1.03778 2.05314 1.43935 1.79428 1.93327C1.5 2.49479 1.5 3.22986 1.5 4.7V10.3C1.5 11.7701 1.5 12.5052 1.79428 13.0667C2.05314 13.5607 2.46619 13.9622 2.97423 14.2139C3.55179 14.5 4.30786 14.5 5.82 14.5Z"
                  stroke="#747477"
                  stroke-linecap="square"
                  stroke-linejoin="bevel"
                />
              </svg>
            </div>
            <div class="row item justify-center items-center">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.04167 6.72917H10M6.04167 9.5H12.375M6.04167 14.25V16.0989C6.04167 16.5208 6.04167 16.7317 6.12814 16.84C6.20334 16.9342 6.31738 16.9891 6.43793 16.9889C6.57654 16.9888 6.74124 16.857 7.07064 16.5935L8.95913 15.0827C9.34491 14.7741 9.5378 14.6198 9.75259 14.51C9.94316 14.4127 10.146 14.3415 10.3556 14.2985C10.5919 14.25 10.8389 14.25 11.333 14.25H13.325C14.6551 14.25 15.3202 14.25 15.8282 13.9911C16.2751 13.7634 16.6384 13.4001 16.8661 12.9532C17.125 12.4452 17.125 11.7801 17.125 10.45V6.175C17.125 4.84488 17.125 4.17981 16.8661 3.67177C16.6384 3.22489 16.2751 2.86156 15.8282 2.63386C15.3202 2.375 14.6551 2.375 13.325 2.375H6.675C5.34488 2.375 4.67981 2.375 4.17177 2.63386C3.72489 2.86156 3.36156 3.22489 3.13386 3.67177C2.875 4.17981 2.875 4.84488 2.875 6.175V11.0833C2.875 11.8196 2.875 12.1877 2.95593 12.4897C3.17554 13.3093 3.81571 13.9495 4.6353 14.1691C4.93733 14.25 5.30544 14.25 6.04167 14.25Z"
                  stroke="#747477"
                  stroke-width="1.2"
                  stroke-linecap="square"
                  stroke-linejoin="bevel"
                />
              </svg>
            </div>
          </div>
          <div class="row col items-center" style="height: 32px">
            <div class="col">{{ $t('texts.en-route-alerts') }}</div>
            <div class="row item justify-center items-center">
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.05 12.75L13.0714 7.5M7.92857 7.5L1.95003 12.75M1.5 3.125L8.84843 8.12601C9.44348 8.53098 9.74101 8.73346 10.0646 8.81189C10.3505 8.88117 10.6495 8.88117 10.9354 8.81189C11.259 8.73346 11.5565 8.53098 12.1516 8.12601L19.5 3.125M5.82 14.5H15.18C16.6921 14.5 17.4482 14.5 18.0258 14.2139C18.5338 13.9622 18.9469 13.5607 19.2057 13.0667C19.5 12.5052 19.5 11.7701 19.5 10.3V4.7C19.5 3.22986 19.5 2.49479 19.2057 1.93327C18.9469 1.43935 18.5338 1.03778 18.0258 0.786108C17.4482 0.5 16.6921 0.5 15.18 0.5H5.82C4.30786 0.5 3.55179 0.5 2.97423 0.786108C2.46619 1.03778 2.05314 1.43935 1.79428 1.93327C1.5 2.49479 1.5 3.22986 1.5 4.7V10.3C1.5 11.7701 1.5 12.5052 1.79428 13.0667C2.05314 13.5607 2.46619 13.9622 2.97423 14.2139C3.55179 14.5 4.30786 14.5 5.82 14.5Z"
                  stroke="#747477"
                  stroke-linecap="square"
                  stroke-linejoin="bevel"
                />
              </svg>
            </div>
            <div class="row item justify-center items-center">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.04167 6.72917H10M6.04167 9.5H12.375M6.04167 14.25V16.0989C6.04167 16.5208 6.04167 16.7317 6.12814 16.84C6.20334 16.9342 6.31738 16.9891 6.43793 16.9889C6.57654 16.9888 6.74124 16.857 7.07064 16.5935L8.95913 15.0827C9.34491 14.7741 9.5378 14.6198 9.75259 14.51C9.94316 14.4127 10.146 14.3415 10.3556 14.2985C10.5919 14.25 10.8389 14.25 11.333 14.25H13.325C14.6551 14.25 15.3202 14.25 15.8282 13.9911C16.2751 13.7634 16.6384 13.4001 16.8661 12.9532C17.125 12.4452 17.125 11.7801 17.125 10.45V6.175C17.125 4.84488 17.125 4.17981 16.8661 3.67177C16.6384 3.22489 16.2751 2.86156 15.8282 2.63386C15.3202 2.375 14.6551 2.375 13.325 2.375H6.675C5.34488 2.375 4.67981 2.375 4.17177 2.63386C3.72489 2.86156 3.36156 3.22489 3.13386 3.67177C2.875 4.17981 2.875 4.84488 2.875 6.175V11.0833C2.875 11.8196 2.875 12.1877 2.95593 12.4897C3.17554 13.3093 3.81571 13.9495 4.6353 14.1691C4.93733 14.25 5.30544 14.25 6.04167 14.25Z"
                  stroke="#747477"
                  stroke-width="1.2"
                  stroke-linecap="square"
                  stroke-linejoin="bevel"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">
              {{ $t('input.checkbox.chauffer_contact_details') }}
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                v-model="searchAlert('BookingChauffeurDetail').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                v-model="searchAlert('BookingChauffeurDetail').sms"
                dense
              />
            </div>
          </div>
          <div class="row col items-center">
            <div class="col items-center">
              {{ $t('input.checkbox.passenger_on_board') }}
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                v-model="searchAlert('PassengerOnBoard').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('PassengerOnBoard').sms" dense />
            </div>
          </div>
        </div>
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">{{ $t('input.checkbox.chauffer_on_way') }}</div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('OnMyWay').email" dense />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('OnMyWay').sms" dense />
            </div>
          </div>
          <div class="row col items-center">
            <div class="col items-center">
              {{ $t('input.checkbox.eta_dropoff') }}
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('EtaUpdate').email" dense />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('EtaUpdate').sms" dense />
            </div>
          </div>
        </div>
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">{{ $t('input.checkbox.chauffer_location') }}</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                v-model="searchAlert('DriverOnLocation').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('DriverOnLocation').sms" dense />
            </div>
          </div>
          <div class="row col items-center">
            <div class="col items-center">
              {{ $t('input.checkbox.passenger_dropoff') }}
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('DropOff').email" dense />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox v-model="searchAlert('DropOff').sms" dense />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div style="font-size: 15px; color: #747477">
        *For certain detinations this information may not be available
      </div>
      <div class="row justify-end" style="gap: 15px">
        <q-btn
          unelevated
          color="secondary"
          text-color="primary"
          :label="$t('buttons.cancel')"
          no-caps
          class=" "
          style="width: 150px"
          :disable="uiStore.isLoading"
          @click="emit('changeEditMode', 'edit', false)"
        >
        </q-btn>
        <q-btn
          v-if="props.type == 'edit'"
          unelevated
          color="accent"
          :label="$t('buttons.save')"
          no-caps
          class=" "
          style="width: 150px"
          :loading="uiStore.isLoading"
          :disable="
            v$.email.$error ||
            v$.name.$error ||
            !uiStore.valid_phone ||
            uiStore.isLoading
          "
          @click="editClient()"
        >
          <template #loading>
            <q-spinner />
          </template>
        </q-btn>
        <q-btn
          v-if="props.type == 'create'"
          unelevated
          color="accent"
          :label="$t('buttons.save')"
          no-caps
          class=" "
          style="width: 150px"
          :disable="
            v$.email.$error ||
            v$.name.$error ||
            !uiStore.valid_phone ||
            v$.address.$error ||
            v$.postal_code.$error ||
            v$.city.$error ||
            v$.taxNumber.$error ||
            uiStore.isLoading ||
            v$.name.$model == '' ||
            v$.phone.$model == '' ||
            v$.email.$model == '' ||
            country_code_ == ''
          "
          @click="addClient()"
        >
          <template #loading>
            <q-spinner />
          </template>
        </q-btn>
      </div>
    </div>
  </div>

  <q-dialog v-model="modal_dialog_save" persistent>
    <div class="modal_dialog column">
      <div class="column" style="gap: 10px">
        <div class="title">Save client</div>
        <div class="text_boxes">Client saved successfully</div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn
          v-close-popup
          unelevated
          style="width: calc(50% - 5px)"
          no-caps
          label="Ok"
          color="accent"
          @click="backToList"
        />
      </div>
    </div>
  </q-dialog>
  <q-dialog v-model="modal_dialog_create" persistent>
    <div class="modal_dialog column">
      <div class="column" style="gap: 10px">
        <div class="row" style="position: relative">
          <div class="title title_custom" style="width: 80%">
            A new user profile has been activated
          </div>
          <svg
            class="cursor-pointer"
            style="position: absolute; right: 0px; top: 0px"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="modal_email = false"
          >
            <path
              d="M12.2858 11.3205L11.1073 12.499L6.39322 7.78496L1.67918 12.499L0.500666 11.3205L5.21471 6.60645L0.500666 1.8924L1.67918 0.713889L12.2858 11.3205ZM12.2858 1.8924L8.75024 5.42793L7.57173 4.24942L11.1073 0.713889L12.2858 1.8924Z"
              fill="#2E2E33"
            />
          </svg>
        </div>

        <div class="text_boxes">
          An email has been sent to the new recipient with instructions to set
          up a password.
        </div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn
          v-close-popup
          style="width: calc(50% - 5px)"
          no-caps
          label="Ok"
          color="accent"
          @click="backToList"
        />
      </div>
    </div>
  </q-dialog>
  <q-dialog v-model="modal_email" persistent>
    <div class="modal_dialog column">
      <div class="column" style="gap: 10px">
        <div
          class="row align-center items-center"
          style="gap: 10px; position: relative"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 14.6667L16 18.6667L29.3333 5.33333M21.3333 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V16"
              stroke="#7CD57B"
              stroke-width="2.13333"
              stroke-linecap="square"
              stroke-linejoin="bevel"
            />
          </svg>
          <div class="title">Email sent</div>
          <svg
            class="cursor-pointer"
            style="position: absolute; right: 0px; top: 0px"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="modal_email = false"
          >
            <path
              d="M12.2858 11.3205L11.1073 12.499L6.39322 7.78496L1.67918 12.499L0.500666 11.3205L5.21471 6.60645L0.500666 1.8924L1.67918 0.713889L12.2858 11.3205ZM12.2858 1.8924L8.75024 5.42793L7.57173 4.24942L11.1073 0.713889L12.2858 1.8924Z"
              fill="#2E2E33"
            />
          </svg>
        </div>

        <div class="text_boxes">
          An email has been sent to the recipient with instructions to reset the
          password.
        </div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn
          v-close-popup
          style="width: 100%"
          no-caps
          label="Thank you"
          color="accent"
        />
      </div>
    </div>
  </q-dialog>
</template>

<style scoped>
.label {
  font-size: 15px;
  font-weight: 400;
  color: #747477;
}
.title_form {
  font-size: 18px;
}
.modal_dialog {
  border: 0px 0px 0px 1px solid #e2e2e2;
  padding: 30px;
  width: 480px;
  gap: 40px;
  background-color: #f8f6f4;
}
.button-secondary {
  background-color: #e6e2dc;
}
.title_custom {
  line-height: 110%;
}

.text_description {
  font-size: 18px;
}
.text_boxes {
  color: #747477;
}
tr {
  height: 32px !important;
  padding: 0px !important;
  margin: 0px !important;
}

.item {
  width: 32px;
  height: 32px;
}
</style>
