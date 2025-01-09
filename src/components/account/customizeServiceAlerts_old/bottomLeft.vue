<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits({
  changeCustomer: null
})
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
</script>

<template>
  <div>
    <div class="label">CLIENTS LIST</div>
    <q-scroll-area :thumb-style="thumbStyle" visible style="height: 600px">
      <q-infinite-scroll :offset="250" @load="onLoad">
        <div v-for="(item, index) in items" :key="index">
          <q-item
            v-ripple
            clickable
            dense
            :item="index"
            :active="selected == index"
            active-class="item-active"
            @click="
              changeSelected(index),
              $emit('changeCustomer', index)
            "
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
