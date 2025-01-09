<script setup lang="ts">
import formRide from '../../../components/ride/newRide/form/formRide.vue'
import clientsInput from '../../common/clientsInput.vue'
import { ref, computed } from 'vue'
import {
  useRidesStore,
  useClientsStore,
  useAuthStore,
  useUiStore,
} from '@/store'
import router from '../../../router'
import { useI18n } from 'vue-i18n'
import type { ClientsGet } from '@/types/clientsGet'
const { t } = useI18n()

const authStore = useAuthStore()
const ridesStore = useRidesStore()
const clientsStore = useClientsStore()

const selectedValue = ref(0)

const types = computed(() => [
  {
    label: t('texts.single_ride'),
    val: 0,
  },
  {
    label: t('texts.round_trip'),
    val: 1,
  },
])

const typeSel = computed({
  get: () =>
    types.value.find(type => type.val === selectedValue.value) ||
    types.value[0],
  set: value => {
    selectedValue.value = value.val
  },
})

const uiStore = useUiStore()

ridesStore.resetRides()

function chageRoute(location: string) {
  router.push(location)
}

async function getRequest() {
  //console.log(authStore.payload?.cid, 'authStore.payload?.cid')
  const request = await ridesStore.requestQuote(1, authStore.payload?.cid || 0)
  if (request) {
    await clientsStore.searchClientsID(clientsStore.currentClientInfo?.id || 0)
    chageRoute('/rides/new/quote')
  }
}
function setClient(client: ClientsGet) {
  clientsStore.selectedClient = client
}
</script>
<template>
  <div class="column" style="gap: 24px">
    <div class="row" style="gap: 8px">
      <div class="bg-secondary module col column" style="gap: 8px">
        <div class="row" style="font-size: 12px; gap: 8px">
          <div class="col">{{ $t('texts.from_location') }}</div>
          <div class="col">{{ $t('texts.to') }}</div>
          <div class="col row">
            <div class="col">{{ $t('texts.date') }}</div>
            <div class="col">&nbsp;</div>
          </div>
        </div>
        <div class="column" style="gap: 6px">
          <formRide :type-sel="typeSel"></formRide>
        </div>
        <div class="row" style="gap: 8px; height: 44px">
          <div class="col">
            <q-select
              v-model="typeSel"
              style="width: 100%"
              bg-color="white"
              square
              filled
              :options="types"
              dense
              dropdown-icon="fa drv-chevron-down"
            ></q-select>
          </div>
          <div class="col">&nbsp;</div>
          <div class="col">&nbsp;</div>
        </div>
      </div>
      <div
        v-if="
          clientsStore.currentClientInfo?.allow_request_with_client_conditions
        "
        class="bg-secondary column module col-2"
      >
        <div>{{ $t('texts.client') }}</div>
        <clientsInput
          :label="$t('texts.client_name')"
          :add-client="false"
          @change="setClient"
        ></clientsInput>
      </div>
    </div>
    <div class="row justify-end items-center">
      <q-btn
        :disable="
          uiStore.isLoading ||
          ridesStore.quoteRide.pickup_1.name == '' ||
          ridesStore.quoteRide.dropoff_1.name == '' ||
          ridesStore.quoteRide.time_1 == '' ||
          ridesStore.quoteRide.date_1 == ''
        "
        :loading="uiStore.isLoading"
        color="primary"
        text-color="white"
        :label="$t('buttons.quote_ride')"
        no-caps
        class="button_"
        @click="getRequest()"
      >
      </q-btn>
    </div>
  </div>
</template>
<style scoped>
.button_ {
  font-size: 15px;
  font-weight: 400px !important;
  width: 446px;
}
.module {
  padding: 16px 16px 24px 16px;
  gap: 8px;
  font-size: 12px;
}
</style>
