<script setup lang="ts">
import { useRidesStore } from '@/store'
import { ref, onMounted } from 'vue'
const ridesStore = useRidesStore()

const props = defineProps({
  index: Number
})

/*
BookingChauffeurDetail
OnMyWay
DriverOnLocation
PassengerOnBoard
EtaUpdate
DropOff
*/

let notifications = ['BookingChauffeurDetail', 'OnMyWay', 'DriverOnLocation']

let noti1 = ref()
let noti2 = ref()
let noti3 = ref()
let pos = 1
for (let j of notifications) {
  for (let i of ridesStore.passengersNotifications[props.index].actions) {
    console.log(i, 'action')
    if (i.name == j) {
      switch (pos) {
        case 1:
          noti1.value = i
          break
        case 2:
          noti2.value = i
          break
        case 3:
          noti3.value = i
          break
      }
    }
  }
  pos++
}
console.log(noti1)
</script>
<template>
  <div class="column" style="height: fit-content">
    <div class="row">
      <div class="col title">Pre-boarding notifications</div>
      <div class="row">
        <div class="icons row items-center justify-center">
          <i class="drv-mail-02" style="font-size: 16px"></i>
        </div>
        <div class="icons row items-center justify-center">
          <i class="drv-message-text-square-02" style="font-size: 16px"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col row items-center">Chauffeur contact details</div>
      <div class="row">
        <div class="icons row items-center justify-center">
          <q-checkbox v-model="noti1.email" dense />
        </div>
        <div class="icons row items-center justify-center">
          <q-checkbox v-model="noti1.sms" dense />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col row items-center">Chauffeur on the way</div>
      <div class="row">
        <div class="icons row items-center justify-center">
          <q-checkbox v-model="noti2.email" dense />
        </div>
        <div class="icons row items-center justify-center">
          <q-checkbox v-model="noti2.sms" dense />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col row items-center">Chauffeur on location</div>
      <div class="row">
        <div class="icons row items-center justify-center">
          <q-checkbox v-model="noti3.email" dense />
        </div>
        <div class="icons row items-center justify-center">
          <q-checkbox v-model="noti3.sms" dense />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icons {
  width: 32px;
  height: 32px;
  color: #747477;
}
.title {
  font-size: 15px;
  color: #747477;
}
</style>
