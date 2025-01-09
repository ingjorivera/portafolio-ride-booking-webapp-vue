<script setup lang="ts">
import { ref, computed } from 'vue'

interface Stop {
  id: number
  time: string
  location: string
}

const props = defineProps<{
  startTime: string
  endTime: string
}>()

const stops = ref<Stop[]>([])
const draggedStop = ref<Stop | null>(null)
const dragOverTime = ref<string | null>(null)

const timeSlots = computed(() => {
  const start = new Date(`2023-01-01T${props.startTime}`)
  const end = new Date(`2023-01-01T${props.endTime}`)
  const slots = []
  const current = new Date(start)

  while (current <= end) {
    slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    current.setMinutes(current.getMinutes() + 15)
  }

  return slots
})

const addStop = () => {
  const newStop: Stop = {
    id: Date.now(),
    time: timeSlots.value[0],
    location: ''
  }
  stops.value.push(newStop)
}

const removeStop = (id: number) => {
  stops.value = stops.value.filter((stop) => stop.id !== id)
}

const onDragStart = (stop: Stop) => {
  draggedStop.value = stop
}

const onDragOver = (event: DragEvent, time: string) => {
  event.preventDefault()
  dragOverTime.value = time
}

const onDrop = (event: DragEvent, time: string) => {
  event.preventDefault()
  if (draggedStop.value && !isTimeOccupied(time)) {
    const stopIndex = stops.value.findIndex((s) => s.id === draggedStop.value!.id)
    if (stopIndex !== -1) {
      stops.value[stopIndex].time = time
    }
  }
  draggedStop.value = null
  dragOverTime.value = null
}

const onDragEnd = () => {
  draggedStop.value = null
  dragOverTime.value = null
}

const isTimeOccupied = (time: string) => {
  return stops.value.some((stop) => stop.time === time && stop.id !== draggedStop.value?.id)
}

const getStopClass = (stop: Stop) => {
  const classes = ['stop']
  if (stop.id === draggedStop.value?.id) {
    classes.push('dragging')
  }
  if (isTimeOccupied(dragOverTime.value!) && stop.time === dragOverTime.value) {
    classes.push('overlapped')
  }
  return classes.join(' ')
}
</script>

<template>
  <div class="ride-scheduler" :class="{ dragging: draggedStop }">
    <div class="timeline">
      <div
        v-for="time in timeSlots"
        :key="time"
        class="time-slot"
        @dragover="onDragOver($event, time)"
        @drop="onDrop($event, time)"
      >
        <div class="time">{{ time }}</div>
        <div class="slot-content">
          <div
            v-for="stop in stops.filter((s) => s.time === time)"
            :key="stop.id"
            :class="getStopClass(stop)"
            draggable="true"
            @dragstart="onDragStart(stop)"
            @dragend="onDragEnd"
          >
            <input v-model="stop.location" placeholder="Enter location" />
            <button class="remove-button" @click="removeStop(stop.id)">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <button class="add-stop" :class="{ hidden: draggedStop }" @click="addStop">Add stop</button>
  </div>
</template>

<style scoped>
.ride-scheduler {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

.timeline {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
}

.time-slot {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.time {
  width: 80px;
  font-weight: bold;
}

.slot-content {
  flex-grow: 1;
}

.stop {
  background-color: #4a4a4a;
  color: white;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease;
  cursor: grab;
}

.stop.overlapped {
  background-color: #ff4444;
}

.stop.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.stop input {
  background-color: transparent;
  border: none;
  color: white;
  flex-grow: 1;
  margin-right: 8px;
}

.remove-button {
  background-color: #6e6e6e;
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.add-stop {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 16px 0;
  cursor: pointer;
  border-radius: 4px;
}

.add-stop.hidden {
  display: none;
}

.ride-scheduler.dragging * {
  cursor: grabbing !important;
}
</style>
