<script setup>
import { ref } from 'vue'
const props = defineProps({
  editMode: Boolean,
  loading: Boolean,
  user: String,
  type: String
})

const emit = defineEmits({
  changeEditMode: null
})
const modal_dialog_delete = ref(false)
</script>
<template>
  <div class="column top-module border2" style="height: 178px; gap: 20px; width: 100%">
    <div class="title">Ride alerts</div>

    <div class="row" style="gap: 20px">
      <div class="column" style="gap: 8px; width: 457px">
        <q-btn
          v-if="props.type == 'edit'"
          v-close-popup
          unelevated
          square
          padding="sm"
          class="bg-primary"
          text-color="white"
          no-caps
          :disabled="props.loading"
          label="New recipient"
          style="width: 100%"
          @click="emit('changeEditMode', 'create', true)"
        />
        <q-input square dense outlined :disable="props.loading" label="Search" style="width: 100%">
          <template #prepend>
            <q-icon name="fa drv-search-md" />
          </template>
        </q-input>
      </div>

      <div class="col justify-end row">
        <div v-if="props.editMode == false" class="row" style="gap: 8px; height: 40px; gap: 10px">
          <q-btn
            v-if="props.editMode == false"
            v-close-popup
            unelevated
            square
            padding="sm"
            class="bg-accent buttons"
            text-color="white"
            no-caps
            :disabled="props.loading"
            @click="emit('changeEditMode', 'edit', true)"
          >
            <i class="drv-edit-02" style="font-size: 16px"></i>
            <div style="padding-left: 7px">Edit</div>
          </q-btn>

          <q-btn
            v-if="props.editMode == true"
            v-close-popup
            unelevated
            square
            padding="sm"
            class="bg-accent buttons"
            text-color="white"
            no-caps
            :disabled="props.loading"
            @click="emit('changeEditMode', '', false)"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.126368 11.8725C-0.0356121 11.7104 -0.0356121 11.4464 0.126368 11.2843L11.285 0.12153C11.447 -0.0405101 11.7109 -0.0405101 11.8729 0.12153C12.0349 0.283571 12.0349 0.547637 11.8729 0.709677L0.714294 11.8725C0.546315 12.0405 0.288347 12.0405 0.126368 11.8725Z"
                fill="white"
              />
              <path
                d="M0.125984 0.12153C0.287964 -0.0405101 0.551931 -0.0405101 0.713911 0.12153L11.8785 11.2903C12.0405 11.4524 12.0405 11.7164 11.8785 11.8785C11.7165 12.0405 11.4526 12.0405 11.2906 11.8785L0.125984 0.709677C-0.0419947 0.541635 -0.0419947 0.283571 0.125984 0.12153Z"
                fill="white"
              />
            </svg>

            <div style="padding-left: 7px">Cancel</div>
          </q-btn>

          <q-btn
            v-close-popup
            unelevated
            square
            padding="sm"
            class="button-secondary buttons"
            text-color="primary"
            no-caps
            :disabled="props.loading"
            @click="modal_dialog_delete = true"
          >
            <i class="drv-trash-04" style="font-size: 16px"></i>
            <div style="padding-left: 7px">Delete</div>
          </q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="modal_dialog_delete" persistent>
      <div class="modal_dialog column">
        <div class="column">
          <div class="title row justify-between">
            <div>Delete client</div>
            <i
              class="drv-x-close cursor-pointer"
              style="font-size: 20px"
              @click="modal_dialog_delete = false"
            ></i>
          </div>
          <div class="text_boxes">Do you want to delete {{ props.user }}?</div>
        </div>
        <div class="row" style="gap: 10px; width: 100%">
          <q-btn
            v-close-popup
            unelevated
            style="width: calc(50% - 5px)"
            no-caps
            label="No"
            class="button-secondary"
          />
          <q-btn
            v-close-popup
            unelevated
            style="width: calc(50% - 5px)"
            no-caps
            label="Yes, delete"
            color="accent"
          />
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<style scoped>
.buttons {
  width: 90px;
  font-weight: 400;
}
.modal_dialog {
  border: 0px 0px 0px 1px solid #e2e2e2;
  padding: 30px;
  width: 480px;
  gap: 40px;
  background-color: #f8f6f4;
}
.button-secondary {
  background-color: #e6e2dc;
}
</style>
