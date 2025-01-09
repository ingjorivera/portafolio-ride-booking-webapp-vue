<script setup lang="ts">
import travelers from './travelers/travelers.vue'
import flight from './flight/flight.vue'
import notifications from './Notifications/notifications.vue'
import addRecipient from './forms/addRecipient.vue'
import total from './total/total.vue'

import { ref, watch } from 'vue'

import { useRidesStore, useClientsStore } from '../../../../store'
import { storeToRefs } from 'pinia'

const clientsStore = useClientsStore()
const ridesStore = useRidesStore()

const { passengersNotifications } = storeToRefs(ridesStore)

const add_recipient = ref(false)

clientsStore.searchKeyword = ''
clientsStore.searchContactsByName()

const thumbStyle = {
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#2E2E33',
  width: '2px',
  opacity: 1,
}
const barStyle = {
  backgroundColor: '#E2E2E2',
  opacity: 0.5,
  width: '1px',
  rigth: '4px',
}
function change() {
  add_recipient.value = false
}
function addRecipientFunction() {
  add_recipient.value = true
  clientsStore.searchKeyword = ''
}
</script>
<template>
  <div class="row">
    <div class="column col" style="padding: 0px 0px 0px 32px">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        visible
        class="column"
        style="height: calc(100vh - 180px); width: 100%; padding-right: 32px"
      >
        <div
          class="column col"
          style="padding-bottom: 32px; padding-top: 32px; gap: 32px"
        >
          <div class="column" style="gap: 16px">
            <div class="" style="font-size: 18px">
              {{ $t('texts.travelers') }}
            </div>
            <div class="card_ column">
              <travelers />
            </div>
          </div>
          <div
            v-if="ridesStore.quoteResults[0].segments[0].airport_code"
            class="column"
            style="gap: 16px"
          >
            <div class="row justify-between" style="font-size: 18px">
              <div>{{ $t('texts.arrival_flight') }}</div>
              <div
                style="
                  font-size: 12px;
                  color: #747477;
                  text-transform: uppercase;
                "
              >
                {{ $t('texts.optional') }}
              </div>
            </div>
            <div class="card1_ column">
              <flight
                :airport_code="
                  ridesStore.quoteResults[0].segments[0].airport_code
                "
                :type="'arrival'"
                :fligth-info="ridesStore.flightInfo.arrival"
                :crew="ridesStore.flightInfo"
              />
            </div>
          </div>
          <div
            v-if="ridesStore.quoteResults[0].segments[1].airport_code"
            class="column"
            style="gap: 16px"
          >
            <div class="row justify-between" style="font-size: 18px">
              <div>{{ $t('texts.departure_flight') }}</div>
              <div
                style="
                  font-size: 12px;
                  color: #747477;
                  text-transform: uppercase;
                "
              >
                {{ $t('texts.optional') }}
              </div>
            </div>
            <div class="card1_ column">
              <flight
                :airport_code="
                  ridesStore.quoteResults[0].segments[1].airport_code
                "
                :type="'departure'"
                :fligth-info="ridesStore.flightInfo.departure"
                :crew="ridesStore.flightInfo"
              />
            </div>
          </div>
          <div class="column" style="gap: 16px">
            <div class="row justify-between" style="font-size: 18px">
              <div>{{ $t('texts.notifications') }}</div>
              <q-btn
                unelevated
                dense
                color="secondary"
                no-caps
                text-color="black"
                :label="$t('buttons.add_recipient')"
                style="
                  padding-left: 8px;
                  padding-right: 8px;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 13.2px;
                  border-radius: 4px;
                  padding-top: 0px !important;
                  padding-bottom: 0px !important;
                  height: 24px;
                "
                @click="addRecipientFunction()"
              />
            </div>
            <template
              v-for="(passenger, i) in passengersNotifications"
              :key="'pas' + i"
            >
              <div class="card_ column">
                <notifications :index="i" />
              </div>
            </template>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="column" style="width: 480px; padding: 32px; gap: 20px">
      <total />
    </div>
  </div>

  <q-dialog v-model="add_recipient" persistent>
    <div class="dialog">
      <div class="row justify-between items-center">
        <div>
          {{ $t('texts.add_recipient') }}
        </div>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="add_recipient = false"
        >
          <path
            d="M12.2858 11.3207L11.1073 12.4992L6.39322 7.7852L1.67918 12.4992L0.500666 11.3207L5.21471 6.60669L0.500666 1.89264L1.67918 0.714133L12.2858 11.3207ZM12.2858 1.89264L8.75024 5.42818L7.57173 4.24967L11.1073 0.714133L12.2858 1.89264Z"
            fill="#2E2E33"
          />
        </svg>
      </div>
      <addRecipient @change="add_recipient = false" />
    </div>
  </q-dialog>
</template>
<style scoped>
.card_ {
  padding: 16px;
  background-color: #f8f6f4;
  gap: 16px;
}
.card1_ {
  gap: 16px;
}

.dialog {
  background-color: #f8f6f4;
  padding: 16px;
  width: 450px;
}
</style>
