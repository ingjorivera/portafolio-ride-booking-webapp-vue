<script setup lang="ts">
import { ref } from 'vue'
import OneWay from './oneWay.vue'
import Hourly from './hourly.vue'
import Daily from './daily.vue'
import { useUiStore } from '../../../store/ui'
const uiStore = useUiStore()

const tab = ref(uiStore.rideType)

function changeRideType(value: string) {
  uiStore.rideType = value
}
</script>
<template>
  <div class="column" style="padding-bottom: 50px">
    <div class="borderbottom">
      <q-tabs
        v-model="tab"
        dense
        no-caps
        align="left"
        narrow-indicator
        indicator-color="accent"
        style="z-index: 99"
        @update:model-value="changeRideType"
      >
        <q-tab name="oneway" :label="$t('texts.one_way')" />
        <q-tab name="hourly" :label="$t('texts.hourly')" />
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        name="oneway"
        style="margin: 0px; padding: 0px; padding-top: 40px"
      >
        <one-way />
      </q-tab-panel>

      <q-tab-panel
        name="hourly"
        style="margin: 0px; padding: 0px; padding-top: 40px"
      >
        <hourly />
      </q-tab-panel>

      <q-tab-panel name="daily">
        <daily />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped>
.borderbottom {
  position: relative;
  box-shadow: 0px -2px 0px 0px #ccc7bf inset;
}
</style>
