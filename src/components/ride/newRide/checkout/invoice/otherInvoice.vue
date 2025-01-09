<script setup lang="ts">
import { ref } from 'vue'
import {
  useClientsStore,
  useRidesStore,
  useUiStore,
} from '../../../../../store'

const clientsStore = useClientsStore()
const ridesStore = useRidesStore()
const uiStore = useUiStore()
const creditcard = ref('')
clientsStore.billingInfo.bank_transfer =
  clientsStore.currentClientInfo?.payment_method.name == 'Bank Transfer'
clientsStore.billingInfo.credit_card =
  clientsStore.currentClientInfo?.payment_method.name == 'Credit Card'

if (clientsStore.currentClientInfo?.invoice_someone_else) {
  clientsStore.billingInfo.info = {
    name: clientsStore.selectedClient?.name || '',
    address: clientsStore.selectedClient?.address || '',
    tax_id: clientsStore.selectedClient?.tax || '',
    zip_code: clientsStore.selectedClient?.postcode || '',
    country: {
      name: clientsStore.selectedClient?.country || '',
      id:
        uiStore.getCountryCode(clientsStore.selectedClient?.country || '') || 0,
    },
  }
}

function resetBillingInfo() {
  clientsStore.creditCard = {
    type: '',
    number: '',
    expiration: '',
    cvc: '',
    holder_name: '',
  }
}
</script>
<template>
  <div class="column" style="gap: 8px">
    <div
      class="column"
      style="background-color: #f8f6f4; padding: 16px; gap: 8px"
    >
      <div>BILLING INFORMATION</div>
      <div class="row">
        <div class="col" style="padding-right: 5px">
          <q-input
            v-model="clientsStore.billingInfo.info.name"
            filled
            dense
            label="Client name"
          />
        </div>
        <div class="col" style="padding-left: 5px">
          <q-input
            v-model="clientsStore.billingInfo.info.tax_id"
            filled
            dense
            label="Tax ID"
          />
        </div>
      </div>
      <div class="row">
        <div class="col" style="padding-right: 5px">
          <q-input
            v-model="clientsStore.billingInfo.info.address"
            filled
            dense
            label="Billing address"
          />
        </div>
        <div class="col" style="padding-left: 5px; padding-right: 5px">
          <q-input
            v-model="clientsStore.billingInfo.info.zip_code"
            filled
            dense
            label="Zip code"
          />
        </div>
        <div class="row col" style="padding-left: 5px; gap: 10px">
          <q-select
            v-model="clientsStore.billingInfo.info.country"
            style="width: 100%"
            bg-color="white"
            square
            filled
            label="Country"
            :options="uiStore.api_countries_sorted_names"
            option-value="id"
            option-label="name"
            dense
            dropdown-icon="fa drv-chevron-down"
          ></q-select>
        </div>
      </div>
    </div>
    <q-expansion-item
      v-model:model-value="clientsStore.billingInfo.bank_transfer"
      switch-toggle-side
      header-class="bg_accordion text-black"
      expand-icon="img:/icons/radio_unselected.svg"
      expanded-icon="img:/icons/radio_selected.svg"
      group="somegroup"
      label="Bank transfer"
      @update:model-value="resetBillingInfo"
    >
      <template #header>
        <q-item-section avatar> Bank transfer </q-item-section>
        <q-item-section>
          <div
            style="
              text-align: right;
              width: 100%;
              color: #747477;
              font-size: 15px;
            "
          >
            Charged automatically
          </div>
        </q-item-section>
      </template>
    </q-expansion-item>
    <q-expansion-item
      v-model:model-value="clientsStore.billingInfo.credit_card"
      switch-toggle-side
      header-class="bg_accordion text-black"
      expand-icon="img:/icons/radio_unselected.svg"
      expanded-icon="img:/icons/radio_selected.svg"
      group="somegroup"
      label="Credit card"
      @update:model-value="resetBillingInfo"
    >
      <q-card
        class="column"
        style="
          border-top: 1px solid #ccc7bf;
          background-color: #f8f6f4;
          padding: 15px;
          gap: 10px;
        "
      >
        <div class="row" style="padding-bottom: 10px">
          <div class="row" style="padding-right: 5px; width: calc(100% / 3)">
            <q-input
              v-model="clientsStore.creditCard.holder_name"
              class="col"
              dense
              filled
              label="Card holder"
            />
          </div>
          <div
            class="col"
            style="padding-right: 5px; padding-left: 5px; width: calc(100% / 3)"
          >
            <q-input
              v-model="clientsStore.creditCard.number"
              class=""
              dense
              filled
              label="Card number"
            />
          </div>
          <div
            class="row"
            style="padding-left: 5px; gap: 10px; width: calc(100% / 3)"
          >
            <q-input
              v-model="clientsStore.creditCard.expiration"
              class="col"
              dense
              filled
              label="Expiration date"
            />
            <q-input
              v-model="clientsStore.creditCard.cvc"
              class="col"
              dense
              filled
              label="CVC"
            />
          </div>
        </div>

        <q-btn
          unelevated
          color="accent"
          label="Save card"
          no-caps
          style="
            width: calc((100% / 3) - 5px);
            height: 44px;
            margin-bottom: 10px;
          "
          @click="popup = false"
        />
        <div
          style="
            color: #747477;
            font-size: 12px;
            line-height: 130%;
            letter-spacing: -0.01em;
          "
        >
          I authorize Camina Lab S. to send instructions to the financial
          institution that issued the card to make payments from the account
          according to the terms previously agreed with Drivania
        </div>
      </q-card>
    </q-expansion-item>
  </div>
</template>
