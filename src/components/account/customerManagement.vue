<script setup lang="ts">
import { ref, onMounted } from 'vue'
import top from './customerManagement/top.vue'
import bottomLeft from './customerManagement/bottomLeft.vue'
import bottomRight from './customerManagement/bottomRight.vue'
import UserInfo from './customerManagement/form/UserInfo.vue'

import { useUiStore } from '@/store'
import { useClientsStore } from '@/store/modules/clients'
import type { ClientsGet } from '@/types/clientsGet'

const uiStore = useUiStore()
const clientsStore = useClientsStore()

const phone = ref('')
const fullName = ref('')
const code_phone = ref('')
const loading = ref(true)
const editMode = ref(false)
const type = ref('edit')
const email = ref('')

const mobile = ref('')
const id = ref()
const sel = ref('')

const country = ref()
const country_province = ref('')
const address = ref('')
const city = ref('')
const postcode = ref('')
const taxNumber = ref('')

function loadCustomer(item: ClientsGet) {
  type.value = 'edit'
  loading.value = true

  editMode.value = false
  setValues(item)
  loading.value = false
}

onMounted(() => {
  loadCustomer(clientsStore.clients[0])
  clientsStore.currentPage = 1
})
function changeEditMode(t: string, value_: boolean, item: ClientsGet) {
  editMode.value = value_

  if (t === 'edit') {
    type.value = 'edit'
  }

  if (t === 'create') {
    type.value = 'create'
    resetForm()
  }
}

function resetForm() {
  phone.value = ''
  taxNumber.value = ''
  mobile.value = ''
  email.value = ''
  country.value = ''
  country_province.value = ''
  address.value = ''
  city.value = ''
  postcode.value = ''
  fullName.value = ''
  code_phone.value = ''
}

function setValues(item: ClientsGet) {
  console.log(item, 'item selected----')
  if (item) {
    code_phone.value =
      uiStore.separateCountryCodeAndPhone(item.phone).countryCode || ''

    fullName.value = item.name
    phone.value =
      uiStore.separateCountryCodeAndPhone(item.phone).phoneNumber || ''
    taxNumber.value = item.tax
    address.value = item.address
    city.value = item.city
    postcode.value = item.postcode
    country.value = uiStore.getCountryCode(item.country)
    // console.log(item.country, 'item.country')
    country_province.value = item.county
    email.value = item.email?.email || item.email || ''
    id.value = item.id
  }
}
</script>

<template>
  <div class="column" style="width: 100%">
    <div class="row" style="width: 100%">
      <top
        :edit-mode="editMode"
        :loading="loading"
        :type="type"
        :user="fullName"
        @change-edit-mode="changeEditMode"
        @change-customer="loadCustomer"
      />
    </div>

    <div class="row" style="width: 100%; height: auto">
      <div class="column list-items" style="gap: 16px; width: 480px">
        <bottomLeft :selected="sel" @change-customer="loadCustomer" />
      </div>

      <div class="col border1 row" style="padding: 32px; position: relative">
        <bottomRight
          v-if="!editMode"
          :id="id"
          :loading="loading"
          :name="fullName"
          :phone="phone"
          :email_="email"
          :code_phone="code_phone"
          :country="uiStore.getCountryName(country)"
          :country_province="country_province"
          :address="address"
          :city="city"
          :postcode="postcode"
          :tax-number="taxNumber"
          :username="''"
        />

        <UserInfo
          v-if="editMode && type === 'edit'"
          :id="id"
          :name="fullName"
          :phone="phone"
          :email_="email"
          :type="type"
          :code_phone="code_phone"
          :country="country"
          :country_province="country_province"
          :address="address"
          :city="city"
          :postcode="postcode"
          :tax-number="taxNumber"
          @load-client="loadCustomer"
          @change-edit-mode="changeEditMode"
        />

        <UserInfo
          v-if="editMode && type === 'create'"
          :id="id"
          :name="fullName"
          :phone="phone"
          :email_="email"
          :type="type"
          :code_phone="code_phone"
          :country="country"
          :country_province="country_province"
          :address="address"
          :city="city"
          :postcode="postcode"
          :tax-number="taxNumber"
          @load-client="loadCustomer"
          @change-edit-mode="changeEditMode"
        />

        <transition name="fade">
          <div
            v-if="loading"
            class="loader row items-center justify-center"
            style="
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            "
          >
            <q-spinner color="accent" size="4em" :thickness="5" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  width: 480px;
}

.border1 {
  border-left: 1px solid #e6e2dc;
}

.border2 {
  border-bottom: 1px solid #e6e2dc;
}

.list-items {
  padding-left: 32px;
  padding-top: 30px;
}

.top-module {
  padding: 0px 24px 0px 24px;
}

.q-item--dense {
  padding-left: 0px !important;
}

.item-active {
  color: #fc6621;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loader {
  background-color: rgba(255, 255, 255, 0.735);
}
</style>
