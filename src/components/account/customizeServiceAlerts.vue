<script setup lang="ts">
import { ref } from 'vue'
import top from './customizeServiceAlerts/top.vue'
import bottomLeft from './customizeServiceAlerts/bottomLeft.vue'
import bottomRight from './customizeServiceAlerts/bottomRight.vue'
import UserInfo from './customizeServiceAlerts/form/UserInfo.vue'
import { useUiStore } from '@/store'
import type { Action } from '@/types/contactsRes'

const uiStore = useUiStore()

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

const per_service = ref(false)
const alerts = ref<Action[]>([])

function loadCustomer(item: any) {
  type.value = 'edit'
  loading.value = true

  editMode.value = false
  setValues(item)
  //loading.value = false
}

function changeEditMode(t: string, value: boolean) {
  editMode.value = value
  if (t == 'edit') {
    type.value = 'edit'
  }
  if (t == 'create') {
    type.value = 'create'
  }
}
function cancelEditMode() {
  editMode.value = false
}

function setValues(item: any) {
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
    country_province.value = item.county
    email.value = item.email?.email || item.email || ''
    id.value = item.id
    per_service.value = item.per_service
    alerts.value = item.actions
    loading.value = false
  }
}

loadCustomer(0)
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
      ></top>
    </div>

    <!-- <div class="column top-module border2" style="height: 178px; gap:20px ">
        <div class="title">Customer Management</div>
        
            <div class="row" style="gap:20px">
            
                <div class="column" style="gap:8px; width:457px">
                <q-btn
    unelevated
      square
      padding="sm"
      class="bg-primary"
      text-color="white"
      no-caps
    
     label="New client"
     style="width: 100%;"
     v-close-popup
    />
    <q-input square  dense outlined   label="Search" style="width: 100%" >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
    </q-input>
            </div>
            
            
            <div class="col justify-end row " >
            <div class="row " style="gap:8px; height:40px">
                <q-btn
    unelevated
      square
      padding="sm"
      class="bg-accent"
      text-color="white"
      no-caps
    icon="edit"
     label="Edit"
     
     v-close-popup
    />
    <q-btn
    unelevated
      square
      padding="sm"
      class="bg-primary"
      text-color="white"
      no-caps
    icon="delete"
     label="Delete"
     
     v-close-popup
    />
            </div>
                
            </div>
        </div>
    
    </div> -->

    <div class="row" style="width: 100%; height: auto">
      <div class="column list-items" style="gap: 16px; width: 480px">
        <bottomLeft @changeRecipient="loadCustomer"></bottomLeft>
      </div>

      <div class="col border1 row" style="padding: 32px; position: relative">
        <bottomRight
          v-if="editMode == false"
          :name="fullName"
          :phone="'(' + code_phone + ')' + phone"
          :per_service="per_service"
          :alerts="alerts"
          :loading="loading"
          :email="email"
        ></bottomRight>

        <UserInfo
          v-if="editMode == true && type == 'edit'"
          :name="fullName"
          :phone="phone"
          :code_phone="code_phone"
          :email_="email"
          :type="type"
          :per_service="per_service"
          :alerts="alerts"
          @change-edit-mode="changeEditMode"
        ></UserInfo>
        <UserInfo
          v-if="editMode == true && type == 'create'"
          :name="''"
          :phone="''"
          :tax-number="''"
          :type="type"
          @change-edit-mode="changeEditMode"
        ></UserInfo>

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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.loader {
  background-color: rgba(255, 255, 255, 0.735);
}
</style>
