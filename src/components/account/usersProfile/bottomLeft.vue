<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useServicesStore } from '../../../store/services'
import { useUiStore } from '../../../store/ui'

const services = useServicesStore()
const uiStore = useUiStore()
const emit = defineEmits({
  changeCustomer: null,
})

services.currentPage = 1

//let init=ref(true)
//const items = ref([{},{},{},{},{},{},{},{}])
//const { listClients } = storeToRefs(services)

// watch(listClients,async(newval,oldval)=>{
//   //console.log('change state')
//   //console.log('scrollReset',uiStore.scrollReset)
//   //emit('changeCustomer',services.listClients[0])
//   console.log(oldval,'oldval-----')
//    console.log(newval,'newval-----')

//   if(newval.length==0&&init.value){

//       infiniteScrollClients.value.setIndex(1)
//       uiStore.scrollReset=false

//       init.value=false
//   }
//   if(uiStore.scrollReset){

//       infiniteScrollClients.value.setIndex(2)
//       uiStore.scrollReset=false

//   }
// })
services.listStaffs = []
const selected = ref()
const sel = ref()

// if(services.listClients.length==0){
//     services.getClients(1).then(()=>{
//     //console.log(services.listClients,'listClients')
//     emit('changeCustomer',services.listClients[0])
//     services.listClientsPage=1
//     sel.value=0
// })
// }
// else{
//     emit('changeCustomer',services.listClients[0])
// }

//let itemsList=ref([])

const infiniteScrollClients = ref(null)

onMounted(() => {
  uiStore.setScroll(infiniteScrollClients.value)
})

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#2E2E33',
  width: '4px',
  opacity: 1,
}

function changeSelected(item: any, index: number) {
  console.log(index, 'index selected')
  selected.value = item
  uiStore.selectedScroll = index
  services.selectedID = item.id
  //console.log(infiniteScrollClients.value,'infiniteScrollClients.value')
  //infiniteScrollClients.value.setIndex(0)
}

function onLoad(index, done) {
  uiStore.isLoading = true
  //console.log(index,'index')
  //console.log(services.listClientsPage,'services.listClientsPage-----')
  //console.log(services.listClients,'services.listClientsPage')
  // /let totalPages=Math.ceil(services.listClients['numFound']/10)
  services.currentPage = index

  setTimeout(() => {
    services.getStaffs().then(res => {
      uiStore.isLoading = false
      console.log('index', index, 'services.currentPage', services.currentPage)
      console.log(res, 'res--------------')

      if (index == 1) {
        emit('changeCustomer', services.listClients[0])
        uiStore.selectedScroll = 0
      }
      if (res) {
        uiStore.scroll.stop()
      }
      done()
    })
  }, 200)

  //services.listClientsPage=index
}
</script>

<template>
  <div>
    <div class="label">{{ $t('texts.profiles') }}</div>
    <!-- <q-scroll-area   :thumb-style="thumbStyle" visible style="height: 600px">
        
       
        <div v-for="(item, index) in services.listClients" :key="index">
            <q-item clickable v-ripple dense   :item="index" :active="sel==index" active-class="item-active" @click="changeSelected(item,index); $emit('changeCustomer',item)">
                <q-item-section>{{ item.name }}</q-item-section>
            </q-item>            
        </div>
        
   
  
    
</q-scroll-area> -->
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
        :initial-index="services.listClientsPage"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in services.listStaffs"
          :key="index"
          class="caption"
        >
          <q-item
            v-ripple
            clickable
            dense
            :item="index"
            :active="uiStore.selectedScroll == index"
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
        <template v-if="services.listStaffs.length == 0 && !uiStore.isLoading">
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
