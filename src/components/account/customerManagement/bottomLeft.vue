<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useClientsStore, useUiStore } from '@/store'

const clientsStore = useClientsStore()
const uiStore = useUiStore()

const emit = defineEmits({
  changeCustomer: null,
})

const selected = ref()

const infiniteScrollClients = ref(null)

onMounted(() => {
  uiStore.setScroll(infiniteScrollClients.value)
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
  clientsStore.selectedClientId = item.id
}

async function onLoad(index: number, done: () => void) {
  uiStore.isLoading = true
  clientsStore.currentPage = index

  setTimeout(async () => {
    const res = await clientsStore.getClients()
    uiStore.isLoading = false
    console.log(
      'index',
      index,
      'clientsStore.currentPage',
      clientsStore.currentPage,
    )
    if (index === 2) {
      console.log('entra')
      emit('changeCustomer', clientsStore.clients[0])
      uiStore.selectedScroll = 0
    }

    if (res && uiStore.scroll) {
      // Added null check
      uiStore.scroll.stop()
    }

    done()
  }, 200)
}
</script>

<template>
  <div>
    <div class="label" style="text-transform: uppercase">
      {{ $t('texts.clients') }}
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      visible
      style="height: calc(100vh - 320px)"
    >
      <q-infinite-scroll
        ref="infiniteScrollClients"
        class="q-pb-md"
        poll
        :offset="100"
        :disable="uiStore.uiScroll"
        :initial-index="clientsStore.currentPage"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in clientsStore.clients"
          :key="index"
          class="caption"
        >
          <q-item
            v-ripple
            clickable
            dense
            :item="index"
            :active="uiStore.selectedScroll === index"
            active-class="item-active"
            @click="changeSelected(item, index), $emit('changeCustomer', item)"
          >
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
        </div>

        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner size="3em" style="color: #e6e2dc" />
          </div>
        </template>

        <template
          v-if="clientsStore.clients.length === 0 && !uiStore.isLoading"
        >
          <div>No result</div>
        </template>
      </q-infinite-scroll>
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
