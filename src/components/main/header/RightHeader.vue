<script setup lang="ts">
import router from '../../../router'
import { useAuthStore, useUiStore } from '../../../store'

//const user = useUserStore()
const uiStore = useUiStore()
//const api = useApiStore();
const authStore = useAuthStore()

function changeRoute(path: string) {
  router.push(path)
}
</script>
<template>
  <div
    class="row items-center justify-center menuHeader"
    style="font-size: 18px"
  >
    <div class="handCursor">{{ $t('buttons.my_rides') }}</div>
    <div>
      <div class="row items-center justify-center handCursor" style="gap: 6px">
        <i
          class="drv-icon drv-user-circle text-accent"
          style="font-size: 28px"
        ></i>

        <div class="text-accent row">
          {{ authStore.payload?.sna }}
          <div style="text-transform: uppercase; padding-left: 3px">
            ({{ authStore.payload?.una ? authStore.payload.una : '' }})
          </div>
        </div>
        <i class="drv-icon drv-chevron-down" style="font-size: 22px"></i>
      </div>
      <q-menu
        anchor="bottom right"
        self="top right"
        class="text-primary"
        style="width: 190px"
      >
        <q-item
          v-if="
            authStore.payload?.sid == undefined ||
            authStore.payload?.sid == null
          "
          v-close-popup
          clickable
          class="menuItem"
        >
          <q-item-section @click="changeRoute('/account/users')">{{
            $t('user_menu.users_profile')
          }}</q-item-section>
        </q-item>
        <q-item v-close-popup clickable class="menuItem">
          <q-item-section @click="changeRoute('/account/management')">{{
            $t('user_menu.my_clients')
          }}</q-item-section>
        </q-item>
        <q-item v-close-popup clickable class="menuItem">
          <q-item-section @click="changeRoute('/account/ride-alerts')">{{
            $t('user_menu.ride_alerts')
          }}</q-item-section>
        </q-item>
        <q-item v-close-popup clickable class="menuItem">
          <q-item-section @click="authStore.logout()">{{
            $t('user_menu.logout')
          }}</q-item-section>
        </q-item>
      </q-menu>
    </div>
    <!-- <div class="circle"></div> -->
  </div>
</template>
<style scoped>
.menuHeader {
  gap: 24px;
}
.circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #2e2e33;
}
.menuItem:hover {
  color: #fc6621;
}
</style>
