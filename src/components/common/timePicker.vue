<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  increment: { type: Number, default: 0 },
  label: { type: String, default: '' }
})
const emit = defineEmits({
  change: null
})

const hours = ref(12)
const minutes = ref(0)
const period = ref('AM')
const time = ref('')
const hour_popup = ref(false)

function changeHours(direction: string) {
  if (direction == 'up') {
    if (hours.value < 12) hours.value = hours.value + 1
    else hours.value = 1
  } else {
    if (hours.value > 1) hours.value = hours.value - 1
    else hours.value = 12
  }
  timeFormat()
  emit('change', time.value)
}

function changeMinutes(direction: string) {
  if (direction == 'up') {
    if (minutes.value < 60 - props.increment) minutes.value = minutes.value + props.increment
  } else {
    if (minutes.value >= props.increment) minutes.value = minutes.value - props.increment
    else minutes.value = 0
  }
  timeFormat()
  emit('change', time.value)
}

function togglePeriod() {
  period.value = period.value === 'AM' ? 'PM' : 'AM'
  timeFormat()
  //convert time to iso format
  emit('change', time.value)
}

function timeFormat() {
  const hoursStr = hours.value < 10 ? '0' + hours.value : hours.value
  const minutesStr = minutes.value < 10 ? '0' + minutes.value : minutes.value
  time.value = `${hoursStr}:${minutesStr} ${period.value}`
}
</script>
<template>
  <q-input
    v-model="time"
    filled
    square
    dense
    class="col"
    :label="props.label"
    @update:model-value="emit('change', time)"
  >
    <template #append>
      <q-icon name="fa drv-clock" class="cursor-pointer"> </q-icon>
    </template>
    <q-popup-edit v-model="hour_popup" :offset="[0, 4]" :cover="false">
      <div class="row hours_input">
        <div class="column">
          <div class="row items-center justify-center cursor-pointer">
            <i class="drv-chevron-up" @click="changeHours('up')"></i>
          </div>

          <q-input v-model="hours" borderless dense model style="width: 40px" />
          <div class="row items-center justify-center cursor-pointer">
            <i class="drv-chevron-down" @click="changeHours('down')"></i>
          </div>
        </div>
        <div class="column items-center">
          <div class="row items-center justify-center cursor-pointer">
            <i class="drv-chevron-up" @click="changeMinutes('up')"></i>
          </div>

          <q-input v-model="minutes" borderless dense model style="width: 40px" />
          <div class="row items-center justify-center cursor-pointer">
            <i class="drv-chevron-down" @click="changeMinutes('down')"></i>
          </div>
        </div>
        <div class="column items-center justify-center q-ml-sm">
          <q-btn flat dense size="sm" :label="period" @click="togglePeriod" />
        </div>
      </div>
    </q-popup-edit>
  </q-input>
</template>
