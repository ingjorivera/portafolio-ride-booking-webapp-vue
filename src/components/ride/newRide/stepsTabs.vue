<script setup lang="ts">
import checkout from './checkout/checkout.vue'
import vehicleSelection from './vehicleSelection/vehicleSelection.vue'
import personalize from './personalise/personalize.vue'
import { useUiStore } from '../../../store/ui'

const uiStore = useUiStore()
</script>
<template>
  <div class="column" style="padding-top: 24px">
    <div class="borderbottom" style="padding-left: 24px; padding-right: 24px">
      <q-tabs
        v-model="uiStore.currentTab"
        dense
        no-caps
        align="left"
        narrow-indicator
        indicator-color="accent"
        style="z-index: 99"
      >
        <q-tab name="step1" :label="'1. ' + $t('texts.select_vehicle')" />
        <q-tab name="step2" :label="'2. ' + $t('texts.customise')" />
        <q-tab name="step3" :label="'3. ' + $t('texts.checkout')" />
      </q-tabs>
    </div>
    <div class="top_bar"></div>
    <q-tab-panels
      v-model="uiStore.currentTab"
      animated
      transition-prev="fade"
      transition-next="fade"
    >
      <q-tab-panel name="step1" style="margin: 0px; padding: 0px">
        <vehicleSelection />
      </q-tab-panel>

      <q-tab-panel name="step2" style="margin: 0px; padding: 0px">
        <personalize />
      </q-tab-panel>

      <q-tab-panel name="step3" style="margin: 0px; padding: 0px">
        <checkout />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped>
.borderbottom {
  position: relative;
  box-shadow: 0px -2px 0px 0px #f2efea inset;
}
.top_bar {
  height: 24px;
  width: 100%;
  content: '';
  background-color: #f8f6f4;
}
</style>
