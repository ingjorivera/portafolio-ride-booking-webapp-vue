<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits({
  changeEditMode: null
})
const props = defineProps({
  name: String,
  phone: Number,
  taxNumber: Number,
  type: String
})
const city = ref('')
const country = ref('')
const address = ref('')
const postcode = ref('')

const modal_dialog_create = ref(false)
const modal_dialog_save = ref(false)
</script>
<template>
  <div class="column" style="gap: 30px; width: calc(100vw - 544px)">
    <div v-if="props.type == 'create'" class="title_form">Create new client</div>
    <div v-if="props.type == 'edit'" class="title_form">Edit general information</div>

    <div class="column" style="gap: 18px">
      <div class="row" style="gap: 20px; width: 100%">
        <div class="column" style="width: 100%">
          <div class="label" style="gap: 4px">Full name*</div>
          <q-input v-model="props.name" rounded dense outlined />
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="row" style="gap: 10px; width: calc(50% - 5px)">
          <div class="column">
            <div class="label" style="gap: 4px">Phone</div>
            <q-select
              v-model="model"
              outlined
              dense
              style="width: 100px"
              :options="options"
              dropdown-icon="img:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMiAxLjA4NTM5QzEyIDAuOTY5NDg2IDExLjk2NzYgMC44NTYyMjIgMTEuOTA3MSAwLjc2MDA4MUMxMS44NDY1IDAuNjYzOTQgMTEuNzYwNiAwLjU4OTI5MSAxMS42NjAxIDAuNTQ1Njc2QzExLjU1OTcgMC41MDIwNjEgMTEuNDQ5NCAwLjQ5MTQ2NCAxMS4zNDMzIDAuNTE1MjM4QzExLjIzNzIgMC41MzkwMTIgMTEuMTQwMiAwLjU5NjA3NyAxMS4wNjQ2IDAuNjc5MTM4TDYuMDAxMjkgNi4wOTM1OEwwLjkzNzk3OCAwLjY3OTEzOEMwLjg4Nzc3MyAwLjYyMzIyIDAuODI3NjM4IDAuNTc4NTc2IDAuNzYxMDk1IDAuNTQ3ODIxQzAuNjk0NTUzIDAuNTE3MDY2IDAuNjIyOTQgMC41MDA4MTggMC41NTA0NTIgMC41MDAwM0MwLjQ3Nzk2NCAwLjQ5OTI0MSAwLjQwNjA1OSAwLjUxMzkyNyAwLjMzODk0NSAwLjU0MzIyN0MwLjI3MTgzMiAwLjU3MjUyOCAwLjIxMDg1OSAwLjYxNTg1NCAwLjE1OTU5OSAwLjY3MDY2OEMwLjEwODM0IDAuNzI1NDgyIDAuMDY3ODI0NCAwLjc5MDY4MiAwLjA0MDQyNDMgMC44NjI0NUMwLjAxMzAyNDMgMC45MzQyMTkgLTAuMDAwNzA5NTU2IDEuMDExMTEgMi44NTg0NWUtMDUgMS4wODg2M0MwLjAwMDc2NTc3MSAxLjE2NjE0IDAuMDE1OTU5NyAxLjI0MjcyIDAuMDQ0NzIwNiAxLjMxMzg4QzAuMDczNDgwNiAxLjM4NTAzIDAuMTE1MjI5IDEuNDQ5MzQgMC4xNjc1MiAxLjUwMzAzTDUuNjE2MDYgNy4zMjk0MkM1LjcxODI0IDcuNDM4NjQgNS44NTY4MSA3LjUgNi4wMDEyOSA3LjVDNi4xNDU3NyA3LjUgNi4yODQzMyA3LjQzODY0IDYuMzg2NTIgNy4zMjk0MkwxMS44MzUxIDEuNTAzMDNDMTEuODg3MiAxLjQ0ODczIDExLjkyODcgMS4zODM4IDExLjk1NzEgMS4zMTIwN0MxMS45ODU0IDEuMjQwMzQgMTIgMS4xNjMyNiAxMiAxLjA4NTM5WiIgZmlsbD0iIzJFMkUzMyIvPgo8L3N2Zz4K"
            />
          </div>
          <div class="column" style="width: calc(100% - 110px)">
            <div class="label" style="gap: 4px">&nbsp;</div>
            <q-input v-model="props.phone" square dense outlined />
          </div>
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Email*</div>
          <q-input v-model="props.name" square dense outlined />
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Tax number*</div>
          <q-input v-model="props.taxNumber" square dense outlined />
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">City*</div>
          <q-input square dense outlined />
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Address*</div>
          <q-input v-model="address" square dense outlined />
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Postcode*</div>
          <q-input v-model="postcode" square dense outlined />
        </div>
      </div>
      <div class="row" style="gap: 10px">
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Country*</div>
          <q-input v-model="country" square dense outlined />
        </div>
        <div class="column" style="width: calc(50% - 5px)">
          <div class="label" style="gap: 4px">Country*</div>
          <q-select
            v-model="model"
            outlined
            dense
            :options="options"
            dropdown-icon="img:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMiAxLjA4NTM5QzEyIDAuOTY5NDg2IDExLjk2NzYgMC44NTYyMjIgMTEuOTA3MSAwLjc2MDA4MUMxMS44NDY1IDAuNjYzOTQgMTEuNzYwNiAwLjU4OTI5MSAxMS42NjAxIDAuNTQ1Njc2QzExLjU1OTcgMC41MDIwNjEgMTEuNDQ5NCAwLjQ5MTQ2NCAxMS4zNDMzIDAuNTE1MjM4QzExLjIzNzIgMC41MzkwMTIgMTEuMTQwMiAwLjU5NjA3NyAxMS4wNjQ2IDAuNjc5MTM4TDYuMDAxMjkgNi4wOTM1OEwwLjkzNzk3OCAwLjY3OTEzOEMwLjg4Nzc3MyAwLjYyMzIyIDAuODI3NjM4IDAuNTc4NTc2IDAuNzYxMDk1IDAuNTQ3ODIxQzAuNjk0NTUzIDAuNTE3MDY2IDAuNjIyOTQgMC41MDA4MTggMC41NTA0NTIgMC41MDAwM0MwLjQ3Nzk2NCAwLjQ5OTI0MSAwLjQwNjA1OSAwLjUxMzkyNyAwLjMzODk0NSAwLjU0MzIyN0MwLjI3MTgzMiAwLjU3MjUyOCAwLjIxMDg1OSAwLjYxNTg1NCAwLjE1OTU5OSAwLjY3MDY2OEMwLjEwODM0IDAuNzI1NDgyIDAuMDY3ODI0NCAwLjc5MDY4MiAwLjA0MDQyNDMgMC44NjI0NUMwLjAxMzAyNDMgMC45MzQyMTkgLTAuMDAwNzA5NTU2IDEuMDExMTEgMi44NTg0NWUtMDUgMS4wODg2M0MwLjAwMDc2NTc3MSAxLjE2NjE0IDAuMDE1OTU5NyAxLjI0MjcyIDAuMDQ0NzIwNiAxLjMxMzg4QzAuMDczNDgwNiAxLjM4NTAzIDAuMTE1MjI5IDEuNDQ5MzQgMC4xNjc1MiAxLjUwMzAzTDUuNjE2MDYgNy4zMjk0MkM1LjcxODI0IDcuNDM4NjQgNS44NTY4MSA3LjUgNi4wMDEyOSA3LjVDNi4xNDU3NyA3LjUgNi4yODQzMyA3LjQzODY0IDYuMzg2NTIgNy4zMjk0MkwxMS44MzUxIDEuNTAzMDNDMTEuODg3MiAxLjQ0ODczIDExLjkyODcgMS4zODM4IDExLjk1NzEgMS4zMTIwN0MxMS45ODU0IDEuMjQwMzQgMTIgMS4xNjMyNiAxMiAxLjA4NTM5WiIgZmlsbD0iIzJFMkUzMyIvPgo8L3N2Zz4K"
          />
        </div>
      </div>
    </div>

    <div class="row justify-end" style="gap: 15px">
      <q-btn
        color="secondary"
        text-color="primary"
        label="Cancel"
        no-caps
        class=" "
        style="width: 150px"
        @click="emit('changeEditMode', 'edit', false)"
      />
      <q-btn
        color="accent"
        label="Save"
        no-caps
        class=" "
        style="width: 150px"
        @click="modal_dialog_save = true"
      />
    </div>
  </div>

  <q-dialog v-model="modal_dialog_save" persistent>
    <div class="modal_dialog column">
      <div class="column">
        <div class="title">Save client</div>
        <div class="text_boxes">Client saved successfully</div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn v-close-popup style="width: calc(50% - 5px)" no-caps label="Ok" color="accent" />
      </div>
    </div>
  </q-dialog>
  <q-dialog v-model="modal_dialog_create" persistent>
    <div class="modal_dialog column">
      <div class="column">
        <div class="title">Create client</div>
        <div class="text_boxes">Client created successfully</div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn v-close-popup style="width: calc(50% - 5px)" no-caps label="Ok" color="accent" />
      </div>
    </div>
  </q-dialog>
</template>

<style scoped>
.label {
  font-size: 15px;
  font-weight: 400;
  color: #747477;
}
.title_form {
  font-size: 18px;
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
