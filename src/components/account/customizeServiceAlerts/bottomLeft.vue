<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useClientsStore, useUiStore } from '@/store'

const clientsStore = useClientsStore()
const uiStore = useUiStore()

const emit = defineEmits({
  changeRecipient: null,
})

const selected = ref()

const infiniteScrollContacts = ref(null)

onMounted(() => {
  uiStore.setScroll(infiniteScrollContacts.value)
  clientsStore.passengers = []
  clientsStore.searchContactsByName().then(() => {
    emit('changeRecipient', clientsStore.contactsRes[0])
  })
})

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#2E2E33',
  width: '4px',
  opacity: '1', // Changed to string to fix TypeScript error
}

function changeSelected(item: any, index: number) {
  selected.value = item
  uiStore.selectedScroll = index
  clientsStore.selectedContactId = item.id
  clientsStore.selectedContact = item
  emit('changeRecipient', item)
}

console.log(clientsStore.passengers, 'clientsStore.passengers')
</script>

<template>
  <div>
    <div class="label" style="text-transform: uppercase">
      {{ $t('texts.recipients') }}
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      visible
      style="height: calc(100vh - 320px)"
    >
      <q-list>
        <div class="caption">
          <template
            v-for="(item, index) in clientsStore.contactsRes"
            :key="index"
          >
            <q-item
              v-ripple
              clickable
              dense
              :item="index"
              :active="uiStore.selectedScroll === index"
              active-class="item-active"
              @click="changeSelected(item, index)"
            >
              <q-item-section>{{ item.name }}</q-item-section>
            </q-item>
          </template>
        </div>
      </q-list>
      <!-- <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner size="3em" style="color: #e6e2dc" />
        </div>
      </template> -->

      <template
        v-if="clientsStore.contactsRes.length === 0 && !uiStore.isLoading"
      >
        <div>No result</div>
      </template>
    </q-scroll-area>
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

.label {
  font-size: 15px;
  font-weight: 400;
  color: #747477;
}
</style>
