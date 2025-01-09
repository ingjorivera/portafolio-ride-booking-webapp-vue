<script setup lang="ts">
import { useQuasar } from 'quasar'

import total from '../personalise/total/total.vue'
import { useDraggable, useDropZone } from '@vueuse/core'
import { useElementBounding } from '@vueuse/core'

import { useMouse } from '@vueuse/core'
import locationsInput from '../../../common/locationsInput.vue'
import { location } from '../../../../types/rides'
import { ref } from 'vue'
import { useUserStore } from '../../../../store/user'

const $q = useQuasar()

const user = useUserStore()

interface ScheduleItem {
  id: number
  start_stop: boolean
  name: string
  time: string
  location: location
  icon: string
}
const slots = ref<ScheduleItem[]>([])

const add_stop = ref(false)
const drag = ref(false)
const schedule = ref<slots[]>([])
const hoursToDisplay = ref(6)
const startingHour = ref(9)
const numberOfSlots = ref(4)
const hours = ref([])
const posIni = ref({ x: 0, y: 0 })
const dragging = ref(false)
const dragWidth = ref('0px')
const dragHeight = ref('0px')

const pickupTime = ref('')
const pickup_location = ref<location>({ lat: 0, lon: 0, name: '', type: 0 })
const location_selected = ref<location>({ lat: 0, lon: 0, name: '', type: 0 })
const time_selected = ref('')

const { x, y } = useMouse({ touch: false })

//function con convert 5:10 to hours an minutes
function convertTime(time: string) {
  const hours = parseInt(time.split(':')[0])
  const minutes = parseInt(time.split(':')[1])
  return { hours: hours, minutes: minutes }
}

const timeConverted = convertTime(user.quoteRide.time_1)
startingHour.value = timeConverted.hours

function dragStart(i: number, element: any) {
  // posIni.value={x:element.x,y:element.y}
  //console.log(element,'element')
  dragging.value = true
  location_selected.value = element.location
  time_selected.value = element.time
  //disable text selection
  document.body.style.userSelect = 'none'
  document.body.style.webkitUserSelect = 'none'

  //get the parent parent element width and height
  const child = document.getElementById('element_' + i)
  const parent = child.parentElement?.parentElement

  const width = parent?.clientWidth + 'px'
  const height = parent?.clientHeight + 'px'
  //console.log(width,'width')
  //console.log(height,'height')

  dragWidth.value = width
  dragHeight.value = height
}
function dragEnd(element: any) {
  ////console.log(element,'element')
  dragging.value = false
  document.body.style.userSelect = 'auto'
  document.body.style.webkitUserSelect = 'auto'
}

function changeHour(time: string, i: number) {
  time_selected.value = time
}

function checkDate(element: any, i: number) {
  if (dragging.value) {
    //console.log(element,'element')
  }
}

for (let i = 0; i < hoursToDisplay.value; i++) {
  slots.value = []
  for (let j = 0; j < numberOfSlots.value; j++) {
    slots.value.push({
      id: i + 1,
      start_stop: false,
      name: '',
      time: j > 0 ? i + 9 + ':' + j * 15 : i + 9 + ':00',
      location: { lat: 0, lon: 0, name: '', type: 0 },
      icon: i == 0 && j == 0 ? 'drv-marker-pin-03' : ''
    })
    if (i == 0 && j == 0) {
      slots.value[0].start_stop = true
      slots.value[0].name = 'Pick up'
      slots.value[0].location = user.quoteRide.pickup_1
      slots.value[0].icon = 'drv-marker-pin-03'
    }
    if (i == hoursToDisplay.value - 1 && j == numberOfSlots.value - 1) {
      slots.value[slots.value.length - 1].start_stop = true
      slots.value[slots.value.length - 1].name = 'Drop off'
      slots.value[slots.value.length - 1].location = user.quoteRide.dropoff_1
      slots.value[slots.value.length - 1].icon = 'drv-flag-05'
    }
  }
  schedule.value.push(slots.value)
}

for (let i = 0; i < hoursToDisplay.value; i++) {
  hours.value.push(
    startingHour.value + i < 12 ? startingHour.value + i + ' AM' : startingHour.value + i + ' PM'
  )
}
//console.log(hours.value, "hours.value");

const thumbStyle = {
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#2E2E33',
  width: '2px',
  opacity: 1
}
const barStyle = {
  backgroundColor: '#E2E2E2',
  opacity: 0.5,
  width: '1px',
  rigth: '4px'
}

const stringOptions = [
  '11:00',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM'
]
const options = ref(stringOptions)

function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase()
    options.value = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}
const model = ref('')
const delete_stop = ref(false)
const edit_stop = ref(false)

function openAddStop(time: string) {
  pickupTime.value = time
  add_stop.value = true
}

function addStopToSlot() {
  for (let i = 0; i < schedule.value.length; i++) {
    for (let j = 0; j < schedule.value[i].length; j++) {
      if (schedule.value[i][j].time == pickupTime.value) {
        //console.log(schedule.value[i][j],'schedule.value[i][j]')
        schedule.value[i][j].location = pickup_location.value
        break
      }
    }
    // //console.log(schedule.value[i],'schedule.value[i]')
  }
  add_stop.value = false
  ////console.log(schedule.value,'schedule.value')
  $q.notify({
    message: 'A new stop has been added to your itinerary',
    classes: 'bg-green-01',

    position: 'top',
    actions: [
      {
        icon: 'fa drv-x-close',
        color: 'white',
        handler: () => {
          /* ... */
        }
      }
    ]
  })
}

function begin_drag(event: any) {
  const { x: mx, y: my, sourceType } = useMouse()

  const copy = event.target.closest('.row').cloneNode(true)
  copy.style.background = 'black'
  document.body.appendChild(copy)
  const { x, y, style } = useDraggable(copy, {
    initialValue: {
      x: mx,
      y: my
    }
  })
}

function test(location: location) {
  pickup_location.value = location
}

function deleteStop() {
  for (let i = 0; i < schedule.value.length; i++) {
    for (let j = 0; j < schedule.value[i].length; j++) {
      if (schedule.value[i][j].time == pickupTime.value) {
        //console.log(schedule.value[i][j],'schedule.value[i][j]')
        schedule.value[i][j].location = { lat: 0, lon: 0, name: '', type: 0 }
        break
      }
    }
    // //console.log(schedule.value[i],'schedule.value[i]')
  }
  $q.notify({
    message: 'The stop has been deleted from your itinerary',
    classes: 'bg-green-01',

    position: 'top',
    actions: [
      {
        icon: 'fa drv-x-close',
        color: 'white',
        handler: () => {
          /* ... */
        }
      }
    ]
  })
}
function setValues(time: string) {
  pickupTime.value = time
}

function editStop() {
  for (let i = 0; i < schedule.value.length; i++) {
    for (let j = 0; j < schedule.value[i].length; j++) {
      if (schedule.value[i][j].time == pickupTime.value) {
        //console.log(schedule.value[i][j],'schedule.value[i][j]')
        schedule.value[i][j].location = pickup_location.value
        break
      }
    }
    // //console.log(schedule.value[i],'schedule.value[i]')
  }
  edit_stop.value = false
  $q.notify({
    message: 'The stop has been edited from your itinerary',
    classes: 'bg-green-01',

    position: 'top',
    actions: [
      {
        icon: 'fa drv-x-close',
        color: 'white',
        handler: () => {
          /* ... */
        }
      }
    ]
  })
}
</script>
<template>
  <div class="row" style="position: relative" @mouseup="dragEnd($event)">
    <div class="column col" style="padding: 0px 0px 0px 32px; border-right: #e2e2e2 1px solid">
      <div class="column justify-center" style="padding-top: 32px; padding-right: 32px">
        <div class="row justify-between">
          <div class="row items-center" style="font-size: 18px; gap: 10px">
            <div>Plan itinerary</div>
            <i class="drv-arrow-narrow-right" style="font-size: 20px"></i>
            <div>From {{ user.quoteRide.time_1 }}H to {{ user.quoteRide.time_2 }}H</div>
          </div>
          <q-btn
            unelevated
            dense
            color="secondary"
            no-caps
            text-color="black"
            style="
              padding-left: 8px;
              padding-right: 8px;
              font-weight: 400;
              font-size: 12px;
              line-height: 13.2px;
              border-radius: 4px;
              padding-top: 0px !important;
              padding-bottom: 0px !important;
              height: 24px;
            "
            @click="add_stop = true"
          >
            <i class="drv-plus" style="font-size: 12px"></i>
            <div style="font-size: 10px">Add stop</div>
          </q-btn>
        </div>
        <div style="font-size: 15px">
          Scheduling all stops will provide a more accurate pricing. You can adjust it later if
          needed.
        </div>
      </div>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        visible
        class="column"
        style="
          height: calc(100vh - 250px);
          width: 100%;
          padding-right: 32px;
          padding-top: 32px;
          padding-bottom: 32px;
          position: relative;
        "
      >
        <!-- <div class="column" style="gap:32px">
      <div class="column justify-center">
        <div class="row justify-between" >
        <div class="row items-center" style="font-size: 18px; gap:10px">
          <div>Plan itinerary</div> 
        <i class="drv-arrow-narrow-right" style="font-size: 20px;"></i>
        <div >From 9:00H to 14:30H</div>

        </div>
        <q-btn @click="add_stop=true" unelevated dense color="secondary" no-caps text-color="black"  style="padding-left:8px; padding-right:8px; font-weight: 400; font-size: 12px; line-height: 13.2px; border-radius: 4px; padding-top:0px !important; padding-bottom:0px !important; height:24px;" >
          <i class="drv-plus" style="font-size: 12px;"></i>
          <div style="font-size:10px">Add stop</div>
        </q-btn>

        
      </div>
      <div style="font-size:15px">
        Scheduling all stops will provide a more accurate pricing. You can adjust it later if needed.
      </div>

      </div>
     
      <div class="row">
        <div class="left">
          <div v-for="i in 6" :key="i" class="time">
            <div>{{ i+8 }} {{i+8>12?'PM':'AM'}}</div>
          </div>

        </div>
        <div class="right col" style="position:relative">
          <hr class="border_top" v-for="i in 5" :key="i" :style="'top:'+i*(48*4)+'px'" style="left:0; width:100%; position:absolute;z-index:1; margin:0; padding:0">
          <draggable
  v-model="schedule"
  group="people"
  @start="drag=true"
  @end="drag=false"
  item-key="id"
  handle=".drv-dots-grid">
  <template #item="{element}">
    <div class="row border items-center" style="height:48px">
      <div v-if="element.start_stop" class="row col justify-between items-center" style="height:42px; background-color: rgba(46, 46, 51, 0.15); padding:4px;gap:8px; padding-left:8px">
        <div class="row items-center" style="gap:8px">
          <i class="drv-marker-pin-03" style="font-size: 12px; color:transparent"></i>
          <div class="column">
            <div style="font-size:10px">{{ element.name }} at {{ element.time }}</div>
            <div class="row" style="gap:4px; color:#71717A">
              <i :class="element.icon" style="font-size: 12px;"></i>
              <div style="font-size:10px">Barcelona</div>
            </div>
          </div>
        </div>
        <div class="icon-lock">
          <i class="drv-lock-01" style="font-size: 12px;"></i>
        </div>
      </div>
      <div v-else class="row col justify-between items-center" style="height:42px; padding:4px;gap:8px; padding-left:8px" :style="element.name!=''?'background-color: #2E2E33':'background-color: white;'">
        <template v-if="element.name!=''">
          <div class="row items-center" style="gap:8px">
            <i class="drv-dots-grid" style="font-size: 12px; color:white; cursor: grab;"></i>
            <div class="column">
              <div style="font-size:10px; color:white">{{ element.name }} at {{ element.time }}</div>
              <div class="row" style="gap:4px; color:#B8B8B8">
                <i class="drv-flag-05" style="font-size: 12px;"></i>
                <div style="font-size:10px">Barcelona</div>
              </div>
            </div>
          </div>
          <div class="row" style="gap:8px; padding-right:6px">
            <q-btn @click="edit_stop=true" unelevated dense color="secondary" no-caps text-color="black"  style=" font-weight: 400; font-size: 12px; line-height: 13.2px; border-radius: 4px; padding-top:0px !important; padding-bottom:0px !important; height:24px; width:24px" >
          <i class="drv-edit-02" style="font-size: 16px;"></i>
        </q-btn>
        <q-btn @click="delete_stop=true" unelevated dense color="secondary" no-caps text-color="black"  style=" font-weight: 400; font-size: 12px; line-height: 13.2px; border-radius: 4px; padding-top:0px !important; padding-bottom:0px !important; height:24px;width:24px" >
          <i class="drv-trash-04" style="font-size: 16px;"></i>
        </q-btn>
          </div>
        </template>
        <template v-else>
          <div class="row items-center" style="gap:8px; position:relative">
            <div class="btn_region row">
              <div class="row add_button items-center" style="gap:8px">
                <div @click="add_stop=true" class="add row items-center justify-center">
                  <i class="drv-plus" style="font-size: 12px;"></i>
                </div>
                <div style="font-size:10px">Add stop</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
</draggable>
         
          
        </div>
      </div>
      <div class="row items-center justify-center" style="text-align:center">Your ride will finish at 14:30H</div>
    </div> -->
        <div class="column">
          <div v-for="(value, i) of schedule" :key="i" class="col row hour_container">
            <div class="time">
              <div>{{ startingHour + i }}</div>
            </div>
            <div class="slots col">
              <div v-for="(element, i) of value" :key="i" class="slot">
                <div class="row border items-center" style="height: 48px">
                  <div
                    v-if="element.start_stop"
                    class="row col justify-between items-center"
                    style="
                      height: 42px;
                      background-color: rgba(46, 46, 51, 0.15);
                      padding: 4px;
                      gap: 8px;
                      padding-left: 8px;
                    "
                  >
                    <div class="row items-center" style="gap: 8px">
                      <i class="drv-marker-pin-03" style="font-size: 12px; color: transparent"></i>
                      <div class="column">
                        <div style="font-size: 10px">{{ element.name }} at {{ element.time }}H</div>
                        <div class="row" style="gap: 4px; color: #71717a">
                          <i :class="element.icon" style="font-size: 12px"></i>
                          <div style="font-size: 10px">{{ element.location['name'] }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="icon-lock">
                      <i class="drv-lock-01" style="font-size: 12px"></i>
                    </div>
                  </div>
                  <div
                    v-else
                    class="row col justify-between items-center actions"
                    style="height: 42px; padding: 4px; gap: 8px; padding-left: 8px"
                    :style="
                      element.location['name'] != ''
                        ? 'background-color: #2E2E33'
                        : 'background-color: white;'
                    "
                    @mouseenter="changeHour(element.time, i)"
                    @mouseup="checkDate(element, i)"
                  >
                    <template v-if="element.location['name'] != ''">
                      <div :id="'element_' + i" class="row items-center" style="gap: 8px">
                        <i
                          class="drv-dots-grid"
                          style="font-size: 12px; color: white; cursor: grab"
                          @mousedown="dragStart(i, element)"
                        ></i>
                        <div class="column">
                          <div style="font-size: 10px; color: white">
                            Pick Up at {{ element.time }}
                          </div>
                          <div class="row" style="gap: 4px; color: #b8b8b8">
                            <i class="drv-flag-05" style="font-size: 12px"></i>
                            <div style="font-size: 10px">{{ element.location['name'] }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="row buttons_actions" style="gap: 8px; padding-right: 6px">
                        <q-btn
                          unelevated
                          dense
                          color="secondary"
                          no-caps
                          text-color="black"
                          style="
                            font-weight: 400;
                            font-size: 12px;
                            line-height: 13.2px;
                            border-radius: 4px;
                            padding-top: 0px !important;
                            padding-bottom: 0px !important;
                            height: 24px;
                            width: 24px;
                          "
                          @click="
                            edit_stop = true,
                            setValues(element.time)
                          "
                        >
                          <i class="drv-edit-02" style="font-size: 16px"></i>
                        </q-btn>
                        <q-btn
                          unelevated
                          dense
                          color="secondary"
                          no-caps
                          text-color="black"
                          style="
                            font-weight: 400;
                            font-size: 12px;
                            line-height: 13.2px;
                            border-radius: 4px;
                            padding-top: 0px !important;
                            padding-bottom: 0px !important;
                            height: 24px;
                            width: 24px;
                          "
                          @click="
                            delete_stop = true,
                            setValues(element.time)
                          "
                        >
                          <i class="drv-trash-04" style="font-size: 16px"></i>
                        </q-btn>
                      </div>
                    </template>
                    <template v-else-if="!dragging && element.location['name'] == ''">
                      <div class="row items-center" style="gap: 8px; position: relative">
                        <div class="btn_region row">
                          <div class="row add_button items-center" style="gap: 8px">
                            <div
                              class="add row items-center justify-center"
                              @click="openAddStop(element.time)"
                            >
                              <i class="drv-plus cursor-pointer" style="font-size: 12px"></i>
                            </div>
                            <div style="font-size: 10px">Add stop</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="column" style="width: 480px; padding: 32px; gap: 20px">
      <total />
    </div>
  </div>
  <div
    ref="drag"
    class="row items-center bg-primary"
    style="
      pointer-events: none;
      cursor: grabbing;
      position: absolute;
      gap: 8px;
      padding: 4px;

      padding-left: 8px;
    "
    :style="{
      display: dragging ? 'flex' : 'none',
      top: y - 210 + 'px',
      left: '80px',
      width: dragWidth,
      height: '42px'
    }"
    @mouseup="dragEnd($event)"
  >
    <i class="drv-dots-grid" style="font-size: 12px; color: white"></i>
    <div class="column">
      <div style="font-size: 10px; color: white">Pick Up at {{ time_selected }}</div>
      <div class="row" style="gap: 4px; color: #b8b8b8">
        <i class="drv-flag-05" style="font-size: 12px"></i>
        <div style="font-size: 10px">{{ location_selected.name }}</div>
      </div>
    </div>
  </div>

  <q-dialog v-model="add_stop" persistent>
    <div class="dialog column" style="gap: 16px">
      <div class="row justify-between items-center">
        <div style="font-size: 20px">Add new stop</div>
        <i class="drv-x-close" style="font-size: 20px" @click="add_stop = false"></i>
      </div>
      <div class="column" style="gap: 8px">
        <q-select
          v-model="pickupTime"
          filled
          dense
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          label="Pickup time"
          class="autofill"
          popup-content-style="'height: 200px; min-height: 100px;'"
          @filter="filterFn"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <locationsInput label="Type address" @change="test($event)" />
      </div>
      <q-btn
        unelevated
        color="primary"
        label="Add stop"
        no-caps
        style="width: 100%"
        @click="addStopToSlot"
      />
    </div>
  </q-dialog>

  <q-dialog v-model="delete_stop" persistent>
    <div class="dialog column" style="gap: 15px">
      <div class="column items-center justify-center" style="height: 103px">
        <div style="font-size: 25px">Do you want to delete this stop?</div>
        <div style="font-size: 15px; color: #58585c">This action can’t be undone</div>
      </div>
      <div class="row" style="gap: 10px; width: 100%">
        <q-btn
          v-close-popup
          unelevated
          style="width: calc(50% - 5px)"
          no-caps
          label="Cancel"
          class="button-secondary"
        />
        <q-btn
          v-close-popup
          unelevated
          style="width: calc(50% - 5px)"
          no-caps
          label="Confirm"
          color="primary"
          @click="deleteStop"
        />
      </div>
    </div>
  </q-dialog>

  <q-dialog v-model="edit_stop" persistent>
    <div class="dialog column" style="gap: 16px">
      <div class="row justify-between items-center">
        <div style="font-size: 20px">Edit stop</div>
        <i class="drv-x-close" style="font-size: 20px" @click="edit_stop = false"></i>
      </div>
      <div class="column" style="gap: 8px">
        <q-select
          v-model="pickupTime"
          filled
          dense
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          label="Pickup time"
          class="autofill"
          popup-content-style="'height: 200px; min-height: 100px;'"
          @filter="filterFn"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <locationsInput label="Type address" @change="test($event)" />
      </div>
      <q-btn
        unelevated
        color="primary"
        label="Save"
        no-caps
        style="width: 100%"
        @click="editStop"
      />
    </div>
  </q-dialog>
</template>
<style scoped>
.time {
  width: 48px;
  height: 192px;
  font-size: 12px;
  color: #71717a;
}
.border {
  border-top: 1px solid #f1f1f1b4;
}
.icon {
  width: 12px;
  height: 12px;
}
.icon-lock {
  width: 24px;
  height: 24px;
}
.border_top {
  border-top: 1px solid #e2e2e2;
}
.add {
  width: 24px;
  height: 24px;
  background-color: #f2efea;
  border-radius: 50%;
}
.add_button {
  display: none;
}

.btn_region {
  width: 200px;
  height: 42px;
}
.btn_region:hover .add_button {
  display: flex;
}
.dialog {
  background-color: #f8f6f4;
  padding: 16px;
  width: 450px;
}
.button-secondary {
  background-color: #e6e2dc;
}
.bg-green-01 {
  background-color: #0e855b;
}
.slots {
  border-top: 1px solid #e2e2e2;
}
.actions:hover .buttons_actions {
  opacity: 1;
}
.actions .buttons_actions {
  opacity: 0;
}
.draggable_ {
  height: 42px;
}
</style>
