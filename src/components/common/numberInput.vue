<script setup lang="ts">
const props = defineProps({
  value: Number
})
const emit = defineEmits({
  change: null
})

function increment() {
  if (props.value < 3) {
    return props.value + 1
  }
  return props.value
}

function decrement() {
  if (props.value > 0) {
    return props.value - 1
  }
  return props.value
}
</script>
<template>
  <div
    class="row bg-white items-center"
    style="gap: 6px; height: 44px; padding-left: 10px; padding-right: 10px"
  >
    <i
      class="drv-minus"
      style="font-size: 20px; opacity: 1"
      :style="value == 0 ? 'opacity:0.5; cursor: not-allowed' : 'cursor: pointer'"
      @click="$emit('change', decrement())"
    ></i>
    <i
      class="drv-plus"
      :style="value >= 3 ? 'opacity:0.5; cursor: not-allowed' : 'cursor: pointer'"
      style="font-size: 20px; opacity: 1"
      @click="$emit('change', increment())"
    ></i>
  </div>
</template>
