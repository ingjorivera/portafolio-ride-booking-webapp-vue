<script setup lang="ts">
import companyInvoice from './invoice/companyInvoice.vue'
import otherInvoice from './invoice/otherInvoice.vue'
import adminPreferences from './adminPreferences/adminPreferences.vue'
import total from '../personalise/total/total.vue'
import { ref } from 'vue'
import { useClientsStore } from '../../../../store'

const clientsStore = useClientsStore()
const tab = ref(clientsStore.currentClientInfo?.default_invoice_to)

const thumbStyle = {
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#2E2E33',
  width: '2px',
  opacity: 1
}
const barStyle = {
  backgroundColor: '#E2E2E2',
  opacity: 0.5,
  width: '1px',
  rigth: '4px'
}
</script>
<template>
  <div class="row" style="position: relative">
    <div class="column col" style="padding: 0px 0px 0px 32px; border-right: 1px solid #e2e2e2">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        visible
        class="column"
        style="height: calc(100vh - 180px); width: 100%; padding-right: 32px"
      >
        <div class="column col" style="padding-bottom: 32px; padding-top: 32px; gap: 32px">
          <div class="column" style="gap: 16px">
            <div class="" style="font-size: 18px">My settings</div>
            <div class="card_ column">
              <adminPreferences />
            </div>
          </div>
          <div class="column" style="gap: 16px">
            <div class="borderbottom">
              <q-tabs
                v-model="tab"
                dense
                no-caps
                align="left"
                narrow-indicator
                indicator-color="accent"
                style="z-index: 99"
              >
                <q-tab
                  name="my_company"
                  :label="'Invoice [' + clientsStore.currentClientInfo?.branch.name + ']'"
                />
                <q-tab name="invoice_someone" label="Invoice someone else" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel
                  v-if="clientsStore.currentClientInfo?.invoice_my_company"
                  name="my_company"
                  style="margin: 0px; padding: 0px; padding-top: 16px"
                >
                  <companyInvoice />
                </q-tab-panel>

                <q-tab-panel
                  v-if="clientsStore.currentClientInfo?.invoice_someone_else"
                  name="invoice_someone"
                  style="margin: 0px; padding: 0px; padding-top: 16px"
                >
                  <otherInvoice />
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="column" style="width: 480px; padding: 32px; gap: 20px">
      <total />
    </div>
  </div>
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
.borderbottom {
  position: relative;
  box-shadow: 0px -2px 0px 0px #ccc7bf inset;
}
</style>
