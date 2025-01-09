<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../../../store/modules/auth'
import { useClientsStore } from '../../../../store/modules/clients'
import { useUiStore } from '../../../../store/ui'
import { useValidationsStore } from '../../../../store/validations_user'

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
  taxNumber: String,
  city: String,
  address: String,
  postcode: String,
  country_province: String,
  country: Number,
  id: Number,
})

const fullName = ref(props.type === 'edit' ? props.name : '')
const phone_ = ref(props.type === 'edit' ? props.phone : '')
const email_ = ref(props.type === 'edit' ? props.email_ : '')
const dial_code_phone = ref(props.type === 'edit' ? props.code_phone : '')
const taxNumber_ = ref(props.type === 'edit' ? props.taxNumber : '')
const city_ = ref(props.type === 'edit' ? props.city : '')
const address_ = ref(props.type === 'edit' ? props.address : '')
const postal_code_ = ref(props.type === 'edit' ? props.postcode : '')
const country_province_ = ref(
  props.type === 'edit' ? props.country_province : '',
)
const country_code_ = ref(props.type === 'edit' ? props.country : '')

const modal_dialog_create = ref(false)
const modal_dialog_save = ref(false)
const modal_email = ref(false)
const label = ref('+0')

const v$ = validations.validateInputs({
  name: fullName,
  phone: phone_,
  email: email_,
  taxNumber: taxNumber_,
  city: city_,
  address: address_,
  postal_code: postal_code_,
  county: country_province_,
  country_code: country_code_,
})

async function addClient() {
  uiStore.setLoading(true)

  const success = await clientsStore.createClient({
    name: fullName.value || '',
    taxNumber: taxNumber_.value || '',
    country_code: country_code_.value || 0,
    county: country_province_.value || '',
    city: city_.value || '',
    postal_code: postal_code_.value || '',
    address: address_.value || '',
    phone:
      (dial_code_phone.value.phoneCode + phone_.value).replace('+', '') || '',
    email: email_.value || '',
  })

  if (success) {
    uiStore.setLoading(false)
    modal_dialog_create.value = true
  }

  uiStore.setLoading(false)
  emit('loadClient', clientsStore.clients[2])
}

async function editClient() {
  uiStore.setLoading(true)

  const code = props.code_phone
    ? props.code_phone
    : dial_code_phone.value.phoneCode

  const success = await clientsStore.updateClient(props.id?.toString() || '0', {
    name: fullName.value || '',
    taxNumber: taxNumber_.value || '',
    email: email_.value || '',
    phone: (code + phone_.value).replace('+', '') || '',
    country_id: country_code_.value || 0,
    county: country_province_.value || '',
    city: city_.value || '',
    postal_code: postal_code_.value || '',
    address: address_.value || '',
  })

  if (success) {
    uiStore.setLoading(false)
    modal_dialog_save.value = true
  }

  uiStore.setLoading(false)
}

function backToList() {
  if (uiStore.scroll) {
    uiStore.scroll.resume()
    uiStore.scroll.reset()
    uiStore.scroll.trigger()
  }

  clientsStore.currentPage = 1
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
</script>

<!-- Template remains unchanged -->
<template>
  <div class="column" style="gap: 30px; width: calc(100vw - 544px)">
    <div v-if="props.type == 'edit'" class="title_form">
      {{ $t('texts.edit_information') }}
    </div>

    <div class="column" style="gap: 18px">
      <div class="row" style="gap: 20px; width: 100%">
        <div class="column" style="width: 100%">
          <div class="label" style="gap: 4px">Full name*</div>
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
            <div class="label" style="gap: 4px">Phone</div>
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
                    Phone number incorrect
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Email*</div>
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
      <div class="row" style="gap: 10px">
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Tax ID*</div>
          <q-input
            v-model="v$.taxNumber.$model"
            square
            dense
            outlined
            :error="v$.taxNumber.$error"
          >
            <template v-if="v$.taxNumber.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.taxNumber.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">City*</div>
          <q-input
            v-model="v$.city.$model"
            square
            dense
            outlined
            :error="v$.city.$error"
          >
            <template v-if="v$.city.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.city.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Address*</div>
          <q-input
            v-model="v$.address.$model"
            square
            dense
            outlined
            :error="v$.address.$error"
          >
            <template v-if="v$.address.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.address.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Postcode*</div>
          <q-input
            v-model="v$.postal_code.$model"
            square
            dense
            outlined
            :error="v$.postal_code.$error"
          >
            <template v-if="v$.postal_code.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.postal_code.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Country/Province*</div>
          <q-input
            v-model="v$.county.$model"
            square
            dense
            outlined
            :error="v$.county.$error"
          >
            <template v-if="v$.county.$error" #append>
              <q-icon name="fa drv-alert-triangle text-negative">
                <q-tooltip class="bg-negative" :offset="[10, 10]">
                  {{ v$.county.$errors[0].$message }}
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Country*</div>
          <q-select
            v-model="country_code_"
            outlined
            dense
            style="width: 100%"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            :options="uiStore.api_countries_sorted_names"
            dropdown-icon="fas drv-chevron-down"
          />
        </div>
      </div>
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
</style>
