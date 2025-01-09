<script setup lang="ts">
import { ref } from 'vue'

const items = ref([{}, {}, {}, {}, {}, {}, {}, {}])
const selected = ref(0)
const itemsList = ref([])
const onLoad = (index: any, done: any) => {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 500)
}

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#2E2E33',
  width: '4px',
  opacity: 1
}

function changeSelected(index: any) {
  selected.value = index
}

changeSelected(0)
</script>

<template>
  <div class="column" style="height: calc(100vh - 92px)">
    <!-- <div class="column top-module border2" style="height: 178px; gap:20px ">
        <div class="title">Customer Management</div>
        
            <div class="row" style="gap:20px">
            
                <div class="column" style="gap:8px; width:457px">
                <q-btn
    unelevated
      square
      padding="sm"
      class="bg-primary"
      text-color="white"
      no-caps
    
     label="New client"
     style="width: 100%;"
     v-close-popup
    />
    <q-input square  dense outlined   label="Search" style="width: 100%" >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
    </q-input>
            </div>
            
            
            <div class="col justify-end row " >
            <div class="row " style="gap:8px; height:40px">
                <q-btn
    unelevated
      square
      padding="sm"
      class="bg-accent"
      text-color="white"
      no-caps
    icon="edit"
     label="Edit"
     
     v-close-popup
    />
    <q-btn
    unelevated
      square
      padding="sm"
      class="bg-primary"
      text-color="white"
      no-caps
    icon="delete"
     label="Delete"
     
     v-close-popup
    />
            </div>
                
            </div>
        </div>
    
    </div> -->

    <div class="row" style="height: calc(100vh - 270px)">
      <div class="column list-items" style="gap: 16px; width: 480px">
        <div class="">CLIENTS LIST</div>
        <q-scroll-area :thumb-style="thumbStyle" visible style="height: calc(100vh - 350px)">
          <q-infinite-scroll :offset="250" @load="onLoad">
            <div v-for="(item, index) in items" :key="index">
              <q-item
                v-ripple
                clickable
                dense
                :item="index"
                :active="selected == index"
                active-class="item-active"
                @click="changeSelected(index)"
              >
                <q-item-section>Client Name #{{ index }}</q-item-section>
              </q-item>
            </div>
            <template #loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-scroll-area>
      </div>

      <div class="col border1 row" style="padding: 32px">
        <div class="column" style="gap: 40px">
          <div class="column" style="gap: 4px">
            <div class="text_boxes">Full Name</div>
            <div class="text_description">Leo cliente</div>
          </div>
          <div class="column" style="gap: 4px">
            <div class="text_boxes">Phone</div>
            <div class="text_description">000-000-0000</div>
          </div>
          <div class="column" style="gap: 4px">
            <div class="text_boxes">Tax number</div>
            <div class="text_description">y8402945k</div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
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
</style>
