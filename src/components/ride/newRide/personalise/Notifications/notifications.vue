<script setup lang="ts">
import top from './cards/top.vue'
import left from './cards/left.vue'
import right from './cards/right.vue'

const props = defineProps({
  index: Number
})
</script>
<template>
  <div class="column" style="gap: 16px">
    <div class="top bg-white" style="padding: 12px">
      <top :index="props.index" />
    </div>
    <div class="row" style="gap: 16px">
      <div class="left bg-white col" style="padding: 8px 12px 8px 12px; height: fit-content">
        <left :index="props.index" />
      </div>
      <div class="right bg-white col" style="padding: 8px 12px 8px 12px; height: fit-content">
        <right :index="props.index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 12px;
  color: #747477;
}
.dialog {
  background-color: #f8f6f4;
  padding: 16px;
  width: 450px;
}
</style>
