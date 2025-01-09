<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { ContactsRes } from '@/types/contactsRes'
import { useUiStore, useClientsStore } from '../../../store'

const search = ref('')

const uiStore = useUiStore()
const clientsStore = useClientsStore()
const listaOriginal = ref<ContactsRes[]>([])
const lista = ref<ContactsRes[]>([])
const props = defineProps({
  editMode: Boolean,
  loading: Boolean,
  user: String,
  type: String,
})

const emit = defineEmits({
  changeEditMode: null,
  changeCustomer: null,
})
const modal_dialog_delete = ref(false)

watch(
  () => clientsStore.contactsRes,
  newValue => {
    if (!search.value) {  
      listaOriginal.value = newValue
    }
  },
  { immediate: true }
)

function deleteClient() {
  clientsStore.deleteContact(clientsStore.selectedContactId || '').then(() => {
    uiStore.setLoading(false)
    modal_dialog_delete.value = false

    clientsStore.contactsRes = []

    //uiStore.scroll.trigger()
    //uiStore.scroll.reset()

    //uiStore.scroll.resume()

    //services.getClients()

    return
  })
}

function filter(value: string) {
  if (!value || value.length === 0) {
    clientsStore.contactsRes = [...listaOriginal.value]
    return
  }
  
  if (value.length >= 3) {
    const filteredContacts = listaOriginal.value.filter(contact => 
      contact.name.toLowerCase().includes(value.toLowerCase())
    )
    clientsStore.contactsRes = filteredContacts
  }
}
</script>
<template>
  <div
    class="column top-module border2"
    style="height: 178px; gap: 20px; width: 100%"
  >
    <div class="title">{{ $t('texts.ride_alerts') }}</div>

    <div class="row" style="gap: 20px">
      <div class="column" style="gap: 8px; width: 457px">
        <q-btn
          v-if="props.type == 'edit'"
          v-close-popup
          unelevated
          square
          padding="sm"
          class="bg-primary"
          text-color="white"
          no-caps
          :disabled="props.loading"
          :label="$t('texts.new_recipient')"
          style="width: 100%"
          @click="emit('changeEditMode', 'create', true)"
        />
        <q-input
          v-model="search"
          square
          dense
          outlined
          :disable="props.loading"
          :label="$t('texts.search')"
          style="width: 100%"
          debounce="500"
          @update:model-value="filter"
        >
          <template #prepend>
            <q-icon name="fa drv-search-md" />
          </template>
        </q-input>
      </div>

      <div class="col justify-end row">
        <div
          v-if="props.editMode == false"
          class="row"
          style="gap: 8px; height: 40px; gap: 10px"
        >
          <q-btn
            v-if="props.editMode == false"
            v-close-popup
            unelevated
            square
            padding="sm"
            class="bg-accent buttons"
            text-color="white"
            no-caps
            :disabled="props.loading"
            @click="emit('changeEditMode', 'edit', true)"
          >
            <i class="drv-edit-02" style="font-size: 16px"></i>
            <div style="padding-left: 7px">{{ $t('texts.edit') }}</div>
          </q-btn>

          <q-btn
            v-close-popup
            unelevated
            square
            padding="sm"
            class="button-secondary buttons"
            text-color="primary"
            no-caps
            :disabled="props.loading"
            @click="modal_dialog_delete = true"
          >
            <i class="drv-trash-04" style="font-size: 16px"></i>
            <div style="padding-left: 7px">{{ $t('texts.delete') }}</div>
          </q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="modal_dialog_delete" persistent>
      <div class="modal_dialog column">
        <div class="column">
          <div class="title row justify-between">
            <div>{{ $t('texts.delete_client') }}</div>
            <i
              class="drv-x-close cursor-pointer"
              style="font-size: 20px"
              @click="modal_dialog_delete = false"
            ></i>
          </div>
          <div class="text_boxes">
            {{ $t('texts.are_you_sure_delete_client') }} {{ props.user }}?
          </div>
        </div>
        <div class="row" style="gap: 10px; width: 100%">
          <q-btn
            v-close-popup
            unelevated
            style="width: calc(50% - 5px)"
            no-caps
            label="No"
            class="button-secondary"
          />
          <q-btn
            v-close-popup
            unelevated
            style="width: calc(50% - 5px)"
            no-caps
            :label="$t('buttons.yes_delete')"
            color="accent"
            :loading="uiStore.isLoading"
            :disable="uiStore.isLoading"
            @click="deleteClient()"
          >
            <template #loading>
              <q-spinner />
            </template>
          </q-btn>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<style scoped>
.buttons {
  width: 90px;
  font-weight: 400;
}
.modal_dialog {
  border: 0px 0px 0px 1px solid #e2e2e2;
  padding: 30px;
  width: 480px;
  gap: 40px;
  background-color: #f8f6f4;
}
.button-secondary {
  background-color: #e6e2dc;
}
</style>
