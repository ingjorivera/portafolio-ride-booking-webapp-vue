<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits({
  actionExecute: null,
  actionCancel: null
})

const props = defineProps({
  title: String,
  text: String,
  icon: String,
  open: Boolean,
  buttonOk: String,
  buttonCancel: String,
  buttonOkSize: String,
  buttonCancelSize: String,
  buttonOkColor: String,
  buttonCancelColor: String
})

const modal = ref(props.open)
</script>

<template>
  <q-dialog v-model="modal" persistent>
    <div class="modal_dialog column">
      <div class="column">
        <div class="row" style="gap: 10px">
          <div class="row align-center items-center" style="gap: 10px; position: relative">
            <div v-if="props.icon != ''">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14.6667L16 18.6667L29.3333 5.33333M21.3333 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V16"
                  stroke="#7CD57B"
                  stroke-width="2.13333"
                  stroke-linecap="square"
                  stroke-linejoin="bevel"
                />
              </svg>
            </div>
            <div class="title">Email sent</div>
            <svg
              class="cursor-pointer"
              style="position: absolute; right: 0px; top: 0px"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="modal = false"
            >
              <path
                d="M12.2858 11.3205L11.1073 12.499L6.39322 7.78496L1.67918 12.499L0.500666 11.3205L5.21471 6.60645L0.500666 1.8924L1.67918 0.713889L12.2858 11.3205ZM12.2858 1.8924L8.75024 5.42793L7.57173 4.24942L11.1073 0.713889L12.2858 1.8924Z"
                fill="#2E2E33"
              />
            </svg>
          </div>
        </div>
        <div class="text_boxes">{{ props.text }}</div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn
          v-if="props.buttonCancel != ''"
          v-close-popup
          unelevated
          :style="`width:calc(${props.buttonCancelSize}% - 5px)`"
          no-caps
          :label="props.buttonCancel"
          :color="props.buttonCancelColor"
          @click="emit('actionCancel')"
        />
        <q-btn
          v-if="props.buttonOk != ''"
          v-close-popup
          unelevated
          :style="`width:calc(${props.buttonOkSize}% - 5px)`"
          no-caps
          :label="props.buttonOk"
          :color="props.buttonOkColor"
          @click="emit('actionExecute')"
        />
      </div>
    </div>
  </q-dialog>
</template>

<style scoped>
.text_description {
  font-size: 18px;
}
.text_boxes {
  color: #747477;
}
.modal_dialog {
  border: 0px 0px 0px 1px solid #e2e2e2;
  padding: 30px;
  width: 480px;
  gap: 40px;
  background-color: #f8f6f4;
}
</style>
