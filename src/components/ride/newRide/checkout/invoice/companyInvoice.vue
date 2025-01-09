<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore, useUiStore } from '../../../../../store'

const creditcard = ref('')
const clientsStore = useClientsStore()
const uiStore = useUiStore()
clientsStore.billingInfo.bank_transfer =
  clientsStore.currentClientInfo?.payment_method.name == 'Bank Transfer'
clientsStore.billingInfo.credit_card =
  clientsStore.currentClientInfo?.payment_method.name == 'Credit Card'
function resetBillingInfo() {
  clientsStore.billingInfo.info = {
    name: '',
    address: '',
    tax_id: '',
    zip_code: '',
    country: {
      name: '',
      id: ''
    }
  }
  clientsStore.creditCard = {
    type: '',
    number: '',
    expiration: '',
    cvc: '',
    holder_name: ''
  }
}
</script>
<template>
  <div class="column" style="gap: 8px">
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
          <div style="text-align: right; width: 100%; color: #747477; font-size: 15px">
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
        style="border-top: 1px solid #ccc7bf; background-color: #f8f6f4; padding: 15px; gap: 10px"
      >
        <div class="column"></div>

        <div>Select your credit card</div>
        <div
          class="bg-white row items-center"
          style="padding-left: 10px; padding-right: 10px; height: 44px; gap: 10px"
        >
          <div style="width: 32px; height: 32px">
            <q-radio
              v-model="creditcard"
              size="xs"
              val="credit1"
              checked-icon="img:/icons/radio_selected.svg"
              unchecked-icon="img:/icons/radio_unselected.svg"
            />
          </div>
          <svg
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F5F5F5" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.751 15.8582H8.69129L7.14674 9.79235C7.07343 9.51332 6.91776 9.26664 6.68879 9.15038C6.11737 8.85821 5.4877 8.62568 4.80078 8.50841V8.27487H8.11886C8.57681 8.27487 8.92026 8.62568 8.97751 9.0331L9.77891 13.4086L11.8376 8.27487H13.8401L10.751 15.8582ZM14.985 15.8582H13.0398L14.6415 8.27487H16.5868L14.985 15.8582ZM19.1035 10.3757C19.1607 9.96725 19.5042 9.73372 19.9049 9.73372C20.5346 9.67508 21.2205 9.79235 21.7929 10.0835L22.1364 8.45079C21.5639 8.21725 20.9343 8.09998 20.3628 8.09998C18.4748 8.09998 17.101 9.15038 17.101 10.6082C17.101 11.7173 18.0741 12.2996 18.761 12.6504C19.5042 13.0002 19.7904 13.2337 19.7332 13.5835C19.7332 14.1082 19.1607 14.3418 18.5893 14.3418C17.9024 14.3418 17.2155 14.1669 16.5868 13.8747L16.2433 15.5084C16.9303 15.7996 17.6734 15.9169 18.3603 15.9169C20.4773 15.9745 21.7929 14.9251 21.7929 13.35C21.7929 11.3664 19.1035 11.2502 19.1035 10.3757ZM28.6008 15.8582L27.0562 8.27487H25.3972C25.0537 8.27487 24.7103 8.50841 24.5958 8.85821L21.7356 15.8582H23.7381L24.1378 14.7502H26.5983L26.8273 15.8582H28.6008ZM25.6834 10.3171L26.2548 13.1751H24.653L25.6834 10.3171Z"
              fill="#172B85"
            />
          </svg>
          <div>XXXXX*****3150</div>
        </div>
        <div
          class="bg-white row items-center"
          style="padding-left: 10px; padding-right: 10px; height: 44px; gap: 10px"
        >
          <div style="width: 32px; height: 32px">
            <q-radio
              v-model="creditcard"
              size="xs"
              checked-icon="img:/icons/radio_selected.svg"
              unchecked-icon="img:/icons/radio_unselected.svg"
              val="credit2"
            />
          </div>
          <svg
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F5F5F5" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.751 15.8582H8.69129L7.14674 9.79235C7.07343 9.51332 6.91776 9.26664 6.68879 9.15038C6.11737 8.85821 5.4877 8.62568 4.80078 8.50841V8.27487H8.11886C8.57681 8.27487 8.92026 8.62568 8.97751 9.0331L9.77891 13.4086L11.8376 8.27487H13.8401L10.751 15.8582ZM14.985 15.8582H13.0398L14.6415 8.27487H16.5868L14.985 15.8582ZM19.1035 10.3757C19.1607 9.96725 19.5042 9.73372 19.9049 9.73372C20.5346 9.67508 21.2205 9.79235 21.7929 10.0835L22.1364 8.45079C21.5639 8.21725 20.9343 8.09998 20.3628 8.09998C18.4748 8.09998 17.101 9.15038 17.101 10.6082C17.101 11.7173 18.0741 12.2996 18.761 12.6504C19.5042 13.0002 19.7904 13.2337 19.7332 13.5835C19.7332 14.1082 19.1607 14.3418 18.5893 14.3418C17.9024 14.3418 17.2155 14.1669 16.5868 13.8747L16.2433 15.5084C16.9303 15.7996 17.6734 15.9169 18.3603 15.9169C20.4773 15.9745 21.7929 14.9251 21.7929 13.35C21.7929 11.3664 19.1035 11.2502 19.1035 10.3757ZM28.6008 15.8582L27.0562 8.27487H25.3972C25.0537 8.27487 24.7103 8.50841 24.5958 8.85821L21.7356 15.8582H23.7381L24.1378 14.7502H26.5983L26.8273 15.8582H28.6008ZM25.6834 10.3171L26.2548 13.1751H24.653L25.6834 10.3171Z"
              fill="#172B85"
            />
          </svg>
          <div>XXXXX*****4240</div>
        </div>
        <div class="column" style="padding-top: 15px; gap: 10px">
          <div>Add your credit card</div>
          <div
            class="row"
            style="border-top: 1px solid #e6e2dc; padding-top: 10px; padding-bottom: 10px"
          >
            <div class="row" style="padding-right: 5px; width: calc(100% / 3)">
              <q-input
                v-model="clientsStore.creditCard.holder_name"
                class="col"
                dense
                filled
                label="Card holder"
              />
            </div>
            <div class="col" style="padding-right: 5px; padding-left: 5px; width: calc(100% / 3)">
              <q-input
                v-model="clientsStore.creditCard.number"
                class=""
                dense
                filled
                label="Card number"
              />
            </div>
            <div class="row" style="padding-left: 5px; gap: 10px; width: calc(100% / 3)">
              <q-input
                v-model="clientsStore.creditCard.expiration"
                class="col"
                dense
                filled
                label="Expiration date"
              />
              <q-input v-model="clientsStore.creditCard.cvc" class="col" dense filled label="CVC" />
            </div>
          </div>
        </div>
        <q-btn
          unelevated
          color="accent"
          label="Save card"
          no-caps
          style="width: calc((100% / 3) - 5px); height: 44px; margin-bottom: 10px"
          @click="popup = false"
        />
        <div style="color: #747477; font-size: 12px; line-height: 130%; letter-spacing: -0.01em">
          I authorize Camina Lab S. to send instructions to the financial institution that issued
          the card to make payments from the account according to the terms previously agreed with
          Drivania
        </div>
      </q-card>
    </q-expansion-item>
  </div>
</template>
