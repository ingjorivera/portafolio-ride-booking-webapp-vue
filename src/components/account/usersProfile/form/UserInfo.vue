<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../../../store/user'
import { useServicesStore } from '../../../../store/services'
import { useUiStore } from '../../../../store/ui'
import { useValidationsStore } from '../../../../store/validations_user'

const env = import.meta.env

const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

const user = useUserStore()
const services = useServicesStore()
const uiStore = useUiStore()
uiStore.valid_phone = true
uiStore.valid_mobile = true

const validations = useValidationsStore()

const emit = defineEmits({
  changeEditMode: null,
  loadClient: null
})
const props = defineProps({
  name: String,
  phone: String,
  id: Number,
  loading: Boolean,

  login_name: String,
  email_: String,
  code_phone: String,
  username: String,
  mobile: String,
  code_mobile: String,
  type: String
})
const fullName = ref()
const phone_ = ref()
const email_ = ref()
const dial_code_phone = ref()
const dial_code_mobile = ref()
const mobile_ = ref()
const username_ = ref()

console.log(props, 'props')

if (props.type == 'edit') {
  fullName.value = props.name
  phone_.value = props.phone
  email_.value = props.email_
  dial_code_phone.value = props.code_phone
  dial_code_mobile.value = props.code_mobile
  mobile_.value = props.mobile
  username_.value = props.login_name
} else {
  console.log('no edit')
}

const modal_dialog_create = ref(false)
const modal_dialog_save = ref(false)
const modal_email = ref(false)
const label = ref('+0')

const v$ = validations.validateInputs({
  name: fullName,
  username: username_,
  email: email_
})

function addClient() {
  uiStore.setLoading(true)
  console.log(dial_code_phone.value, 'phonecode')
  services
    .createStaff(
      fullName.value || '',
      email_.value || '',

      (dial_code_phone.value + phone_.value).replace('+', ''),
      (dial_code_mobile.value + mobile_.value).replace('+', ''),
      username_.value || ''
    )
    .then((res) => {
      if (res) {
        uiStore.setLoading(false)
        modal_dialog_create.value = true
      }
      uiStore.setLoading(false)
      emit('loadClient', services.listClients[0])
    })
}
function editClient() {
  uiStore.setLoading(true)

  let code

  let c_mobile

  if (props.code_phone != '') {
    code = props.code_phone || ''
  } else {
    code = dial_code_phone.value.phoneCode
  }

  if (props.code_mobile != '') {
    c_mobile = props.code_mobile || ''
  } else {
    c_mobile = dial_code_mobile.value.phoneCode
  }

  services
    .modifyStaff(
      props.id || 0,
      fullName.value || '',
      email_.value || '',
      (code + phone_.value).replace('+', ''),
      (c_mobile + mobile_.value).replace('+', '')
    )
    .then((res) => {
      if (res) {
        uiStore.setLoading(false)
        modal_dialog_save.value = true
        uiStore.scroll.resume()
        services.listClients = []
        uiStore.scroll.reset()

        //uiStore.scroll.trigger()
        //uiStore.scroll.reset()

        //services.searchKeyword=value
        services.currentPage = 1
        //uiStore.scroll.resume()
        console.log('hace todo 1')
        //services.getClients()
        uiStore.scroll.trigger()
      }

      uiStore.setLoading(false)
    })
}

function backToList() {
  emit('changeEditMode', 'edit', false)
}
function setCountry(val: string) {
  //console.log('entra')
  label.value = ''
}
async function checkPhone(type: string) {
  let number = ''
  let code = ''

  if (type == 'phone') {
    number = phone_.value

    if (props.code_phone != '') {
      code = props.code_phone || ''
    } else {
      code = dial_code_phone.value.phoneCode
    }
  } else {
    number = mobile_.value
    if (props.code_mobile != '') {
      code = props.code_mobile || ''
    } else {
      code = dial_code_mobile.value.phoneCode
    }
  }

  //remove + from phone number
  console.log(code, 'code-------')

  if (number.length > 4 && code != '') {
    code = code.replace('+', '')

    if (number.match(/^\d+$/)) {
      await uiStore.validatePhone(number, user.token, code, type)
    }
    // else{

    // }
  }
}
</script>
<template>
  <div class="column" style="gap: 30px; width: calc(100vw - 544px)">
    <div v-if="props.type == 'edit'" class="title_form">Edit user profile</div>

    <div class="column" style="gap: 18px">
      <div class="row" style="gap: 20px; width: 100%">
        <div class="column" style="width: 100%">
          <div class="label" style="gap: 4px">Full name*</div>
          <q-input v-model="v$.name.$model" rounded dense outlined :error="v$.name.$error">
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
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Username*</div>
          <q-input
            v-model="v$.username.$model"
            :disable="props.login_name != ''"
            square
            dense
            outlined
            :error="v$.username.$error"
          >
            <template v-if="v$.username.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.username.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Email*</div>
          <q-input v-model="v$.email.$model" square dense outlined :error="v$.email.$error">
            <template v-if="v$.email.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.email.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="row" style="gap: 10px; width: calc(50% - 5px)">
          <div class="column">
            <div class="label" style="gap: 4px">Phone</div>
            <q-select
              v-model="dial_code_phone"
              dropdown-icon="fas drv-chevron-down"
              square
              dense
              outlined
              :label="label"
              :options="uiStore.api_countries_sorted_phoneCodes"
              option-label="phoneCode"
              option-value="phoneCode"
              style="width: 70px"
              @update:model-value="setCountry"
            />
          </div>
          <div class="column" style="width: calc(100% - 80px)">
            <div class="label" style="gap: 4px">&nbsp;</div>
            <q-input
              v-model="phone_"
              square
              dense
              outlined
              style="width: 100%"
              :error="!uiStore.valid_phone"
              @blur="checkPhone('phone')"
            >
              <template v-if="!uiStore.valid_phone" #append>
                <q-icon name="fa drv-alert-triangle text-negative">
                  <q-tooltip class="bg-negative" :offset="[10, 10]">
                    Phone number incorrect
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row" style="gap: 10px; width: calc(50% - 5px)">
          <div class="column">
            <div class="label" style="gap: 4px">Mobile</div>
            <q-select
              v-model="dial_code_mobile"
              dropdown-icon="fas drv-chevron-down"
              square
              dense
              outlined
              :label="label"
              :options="uiStore.api_countries_sorted_phoneCodes"
              option-label="phoneCode"
              option-value="phoneCode"
              style="width: 70px"
              @update:model-value="setCountry"
            />
          </div>
          <div class="column" style="width: calc(100% - 80px)">
            <div class="label" style="gap: 4px">&nbsp;</div>
            <q-input
              v-model="mobile_"
              square
              dense
              outlined
              style="width: 100%"
              :error="!uiStore.valid_mobile"
              @blur="checkPhone('mobile')"
            >
              <template v-if="!uiStore.valid_mobile" #append>
                <q-icon name="fa drv-alert-triangle text-negative">
                  <q-tooltip class="bg-negative" :offset="[10, 10]">
                    Mobile phone number incorrect
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-end" style="gap: 15px">
      <q-btn
        unelevated
        color="secondary"
        text-color="primary"
        label="Cancel"
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
        label="Save"
        no-caps
        class=" "
        style="width: 150px"
        :loading="uiStore.isLoading"
        :disable="v$.email.$error || v$.name.$error || !uiStore.valid_phone || uiStore.isLoading"
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
        label="Save"
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
          v$.email.$model == ''
        "
        @click="addClient()"
      >
        <template #loading>
          <q-spinner />
        </template>
      </q-btn>
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
          An email has been sent to the new recipient with instructions to set up a password.
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
        <div class="row align-center items-center" style="gap: 10px; position: relative">
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
          An email has been sent to the recipient with instructions to reset the password.
        </div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn v-close-popup style="width: 100%" no-caps label="Thank you" color="accent" />
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
</style>
