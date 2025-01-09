<script setup lang="ts">
import { ref } from 'vue'

import { useServicesStore } from '../../../../../store/services'
import { useRidesStore } from '../../../../../store'

import { Fbos } from '../../../../../types/flight'

const option_sel = ref(0)

const props = defineProps({
  airport_code: String,
  flight: Object,
  type: String,
  fligthInfo: Object,
  crew: Object
})

const ridesStore = useRidesStore()
const services = useServicesStore()
const variable = ref('')
const flight_tracking = ref('We’ll notify if there are any changes that affect you ride')

//declare fbos and initialize it blank

const fbos = ref([{ fbo_id: '', fbo_name: '' }])

//console.log(props.flight,'props.flight')

ridesStore
  .getFbos(props.airport_code || '')
  .then(() => {
    console.log(ridesStore.listFbos['data'], 'services.listFbos-----')
    if (ridesStore.listFbos['data']) {
      fbos.value = ridesStore.listFbos['data']
      console.log(fbos.value, 'fbos.value')
    } else {
      fbos.value = []
    }
  })
  .catch((error) => {
    console.error('Failed to fetch FBOs:', error)
  })

// services.getFbos(props.airport_code || '')
//   .then(() => {
//     console.log(services.listFbos['data'],'services.listFbos-----')
//     if(services.listFbos['data']){
//       fbos.value = services.listFbos['data'];
//       console.log(fbos.value,'fbos.value')
//     }
//     else{
//       fbos.value=[]
//     }

//   })
//   .catch(error => {
//     console.error('Failed to fetch FBOs:', error);
//   });
/*
type:'',
                flightNumber:'',
                tailNumber:'',
                fboId:'',
                crewMembers:false,
*/
function changeFBO() {
  console.log(props.flight, 'props.flight.fboId')
}
function resetData() {
  props.fligthInfo.fbo = {
    fbo_id: '',
    fbo_name: ''
  }
  props.fligthInfo.flightNumber = ''
  props.fligthInfo.tailNumber = ''
  props.crew.crewMembers = false
}
</script>

<template>
  <div class="column" style="gap: 16px">
    <q-expansion-item
      :group="'flight' + props.type"
      switch-toggle-side
      header-class="bg_accordion text-black"
      expand-icon="img:/icons/radio_unselected.svg"
      expanded-icon="img:/icons/radio_selected.svg"
      label="Commercial flight"
      @update:model-value="resetData()"
    >
      <q-card
        class="row"
        style="border-top: 1px solid #ccc7bf; background-color: #f8f6f4; padding: 10px; gap: 20px"
      >
        <q-input v-model="props.fligthInfo.flightNumber" dense filled label="Flight number">
          <template #append>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9974 5L7.83073 14.1667L3.66406 10"
                stroke="#58585C"
                stroke-width="1.2"
                stroke-linecap="square"
                stroke-linejoin="bevel"
              />
            </svg>
          </template>
        </q-input>
        <q-input
          v-model="flight_tracking"
          dense
          class="col"
          filled
          label="Flight tracking"
          disable
          readonly
        />
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      :group="'flight' + props.type"
      switch-toggle-side
      header-class="bg_accordion text-black"
      expand-icon="img:/icons/radio_unselected.svg"
      expanded-icon="img:/icons/radio_selected.svg"
      label="Private flight"
      @update:model-value="resetData()"
    >
      <q-card
        class="row"
        style="border-top: 1px solid #ccc7bf; background-color: #f8f6f4; padding: 10px; gap: 10px"
      >
        <q-input
          v-model="props.fligthInfo.tailNumber"
          dense
          class="col"
          filled
          label="Tail number"
        />
        <q-select
          v-model="props.fligthInfo.fbo"
          :disable="fbos.length == 0"
          filled
          dense
          class="col"
          label="Select FBO"
          :options="fbos"
          option-value="fbo_id"
          option-label="fbo_name"
          dropdown-icon="fa drv-chevron-down"
          @update:model-value="changeFBO"
        />

        <div class="checkbox-container">
          <input
            :id="'custom-checkbox' + props.airport_code"
            v-model="props.crew.crewMembers"
            type="checkbox"
            class="custom-checkbox"
          />
          <label
            :for="'custom-checkbox' + props.airport_code"
            class="checkbox-label justify-between"
          >
            Crew members
            <div class="checkmark"></div>
          </label>
        </div>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<style scoped>
.checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 200px;
  height: 44px;
}

.custom-checkbox {
  display: none; /* Hide default checkbox */
}

.checkbox-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 10px;
  width: 200px;
  height: 44px;
  background: #2e2e33;
  border-radius: 2px;
  color: #ffffff;
  font-family: 'Neue Montreal';
  font-size: 15px;
  line-height: 130%;
  letter-spacing: -0.01em;
  position: relative;
  cursor: pointer;
}

.checkmark {
  width: 20px;
  height: 20px;
  background: #f8f6f4;
  border-radius: 1px;
  border: 1px solid #2e2e33;
  position: relative;
}

.checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 2px;
  top: 4px;
  width: 13px;
  height: 9px;
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNiAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjY2NzMgMUw1LjUwMDY1IDEwLjE2NjdMMS4zMzM5OCA2IiBzdHJva2U9IiMyRTJFMzMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiLz4KPC9zdmc+Cg==')
    no-repeat center center;
  background-size: contain;
}

.custom-checkbox:checked + .checkbox-label .checkmark::after {
  display: block;
}
</style>
