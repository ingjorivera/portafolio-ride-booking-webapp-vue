<script setup lang="ts">
import type { Action } from '@/types/contactsRes'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  name: string
  phone: string
  loading: boolean
  per_service: boolean
  alerts: Array<Action>
  email: string
}>()

const val = ref('')
const per_ser = ref(props.per_service)
const actions = ref(props.alerts)

watch(
  () => props.per_service,
  newValue => {
    per_ser.value = newValue
  },
)

watch(
  () => props.alerts,
  newValue => {
    actions.value = newValue
    console.log(actions.value, 'actions')
  },
)

onMounted(() => {
  console.log(per_ser.value, 'per_ser')
})

const searchAlert = (searchName: string) => {
  const alert = actions.value.find(item => item.name === searchName)
  return alert
    ? { email: alert.email, sms: alert.sms }
    : { email: false, sms: false }
}
</script>
<template>
  <div
    class="column"
    style="position: relative; width: calc(100vw - 544px); gap: 50px"
  >
    <div class="column" style="gap: 16px">
      <div class="column" style="gap: 4px; width: 100%; height: auto">
        <div class="text_boxes">{{ $t('texts.recipients_name') }}</div>
        <div class="text_description">{{ props.name }}</div>
      </div>
      <div class="row" style="width: 100%">
        <div class="column col-6" style="gap: 40px">
          <div class="column" style="gap: 4px">
            <div class="text_boxes">{{ $t('texts.phone') }}</div>
            <div class="text_description">{{ props.phone }}</div>
          </div>
        </div>
        <div class="column col-6" style="gap: 40px">
          <div class="column" style="gap: 4px">
            <div class="text_boxes">{{ $t('texts.email') }}</div>
            <div class="text_description">{{ props.email }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-checkbox
        v-model="per_ser"
        dense
        label="Add this recipient automatically in every new ride"
        disable
      />
      <div style="padding-left: 30px">
        Enabling this feature will allow this recipient to receive alerts for
        all bookings.
      </div>
    </div>
    <div class="column" style="gap: 20px">
      <div>Recipient's alerts</div>
      <div class="column" style="gap: 2px">
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">Pre-boarding alerts</div>
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
            <div class="col">En-route alerts</div>
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
            <div class="col">Chauffeur contact details</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('BookingChauffeurDetail').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('BookingChauffeurDetail').sms"
                dense
              />
            </div>
          </div>
          <div class="row col items-center">
            <div class="col items-center">Passenger on board</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('PassengerOnBoard').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('PassengerOnBoard').sms"
                dense
              />
            </div>
          </div>
        </div>
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">Chauffer on the way</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('OnMyWay').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox disable v-model="searchAlert('OnMyWay').sms" dense />
            </div>
          </div>
          <div class="row col items-center">
            <div class="col items-center">ETA at drop-off</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('EtaUpdate').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('EtaUpdate').sms"
                dense
              />
            </div>
          </div>
        </div>
        <div class="row col" style="gap: 30px">
          <div class="row col items-center" style="height: 32px">
            <div class="col">Chauffeur on location</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('DriverOnLocation').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('DriverOnLocation').sms"
                dense
              />
            </div>
          </div>
          <div class="row col items-center">
            <div class="col items-center">Passenger dropped off</div>
            <div class="row item justify-center items-center">
              <q-checkbox
                disable
                v-model="searchAlert('DropOff').email"
                dense
              />
            </div>
            <div class="row item justify-center items-center">
              <q-checkbox disable v-model="searchAlert('DropOff').sms" dense />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
