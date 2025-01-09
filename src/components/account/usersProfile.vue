<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '../../store/ui'
import top from './usersProfile/top.vue'
import bottomLeft from './usersProfile/bottomLeft.vue'
import bottomRight from './usersProfile/bottomRight.vue'
import UserInfo from './usersProfile/form/UserInfo.vue'

const uiStore = useUiStore()
const phone = ref('')
const fullName = ref('')
const code_phone = ref('')
const loading = ref(true)
const editMode = ref(false)
const type = ref('edit')
const email = ref('')
const username = ref('')
const mobile = ref('')
const id = ref()
const clientID = ref()
const sel = ref('')
const login_name = ref('')
const code_mobile = ref('')

function loadCustomer(item: any) {
  console.log('llama load customer')
  type.value = 'edit'
  loading.value = true

  editMode.value = false
  setValues(item)
  loading.value = false
}

function changeEditMode(t: string, value_: boolean, item: any) {
  editMode.value = value_
  if (t == 'edit') {
    type.value = 'edit'
  }
  if (t == 'create') {
    type.value = 'create'
    phone.value = ''
    code_phone.value = ''
    mobile.value = ''
    code_mobile.value = ''
    username.value = ''
    email.value = ''
    fullName.value = ''
    clientID.value = ''
    id.value = ''
    login_name.value = ''
  }
}

function setValues(item: any) {
  console.log(item, 'item')

  if (item) {
    phone.value = uiStore.separateCountryCodeAndPhone(item.phone).phoneNumber || ''
    code_phone.value = uiStore.separateCountryCodeAndPhone(item.phone).countryCode || ''
    mobile.value = uiStore.separateCountryCodeAndPhone(item.mobile).phoneNumber || ''
    code_mobile.value = uiStore.separateCountryCodeAndPhone(item.mobile).countryCode || ''
    username.value = item.username
    login_name.value = item.login_name
    fullName.value = item.name
    clientID.value = item.client_id
    id.value = item.id

    if (item.email['email'] != null) {
      email.value = item.email['email']
    } else {
      email.value = item.email
    }
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
      ></top>
    </div>

    <div class="row" style="width: 100%; height: auto">
      <div class="column list-items" style="gap: 16px; width: 480px">
        <bottomLeft :selected="sel" @change-customer="loadCustomer"></bottomLeft>
      </div>

      <div class="col border1 row" style="padding: 32px; position: relative">
        <bottomRight
          v-if="editMode == false"
          :id="id"
          :name="fullName"
          :phone="phone"
          :loading="loading"
          :mobile="mobile"
          :code_mobile="code_mobile"
          :username="username"
          :email_="email"
          :code_phone="code_phone"
          :login_name="login_name"
        ></bottomRight>

        <UserInfo
          v-if="editMode == true && type == 'edit'"
          :id="id"
          :name="fullName"
          :phone="phone"
          :loading="loading"
          :mobile="mobile"
          :code_mobile="code_mobile"
          :username="username"
          :email_="email"
          :code_phone="code_phone"
          :login_name="login_name"
          :type="type"
          @load-client="loadCustomer"
          @change-edit-mode="changeEditMode"
        ></UserInfo>
        <UserInfo
          v-if="editMode == true && type == 'create'"
          :id="id"
          :name="fullName"
          :phone="phone"
          :loading="loading"
          :mobile="mobile"
          :code_mobile="code_mobile"
          :username="username"
          :email_="email"
          :code_phone="code_phone"
          :login_name="login_name"
          :type="type"
          @load-client="loadCustomer"
          @change-edit-mode="changeEditMode"
        ></UserInfo>

        <transition name="fade">
          <div
            v-if="loading"
            class="loader row items-center justify-center"
            style="position: absolute; left: 0; top: 0; width: 100%; height: 100%"
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
