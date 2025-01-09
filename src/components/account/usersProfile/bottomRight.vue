<script setup lang="ts">
import { useServicesStore } from '../../../store/services'

const services = useServicesStore()
import { ref } from 'vue'

const props = defineProps({
  name: String,
  phone: String,
  id: Number,
  loading: Boolean,
  clienID: Number,
  login_name: String,
  email_: String,
  code_phone: String,
  username: String,
  mobile: String,
  code_mobile: String
})
const modal_email = ref(false)

function changePassword() {
  if (props.id && props.login_name)
    services.changeStaffPassword(props.id, props.login_name).then((res) => {
      if (res) {
        modal_email.value = true
      }
    })
}
</script>
<template>
  <div class="column" style="position: relative; width: calc(100vw - 544px); gap: 16px">
    <div class="column" style="gap: 4px; width: 100%">
      <div class="text_boxes">Full Name</div>
      <template v-if="props.name != ''">
        <div class="text_description">{{ props.name }}</div>
      </template>
      <template v-else> &nbsp;</template>
    </div>
    <div class="row" style="width: 100%">
      <div class="column col-6" style="gap: 16px">
        <div class="column" style="gap: 4px">
          <div class="text_boxes">Phone</div>
          <div class="text_description">
            <template v-if="props.code_phone != ''">
              ({{ props.code_phone }}) {{ props.phone }}</template
            >
            <template v-else> &nbsp;</template>
          </div>
        </div>

        <div class="column" style="gap: 4px">
          <div class="text_boxes">Mobile</div>
          <div class="text_description">
            <template v-if="props.mobile != ''">
              ({{ props.code_mobile }}) {{ props.mobile }}</template
            >
            <template v-else> &nbsp;</template>
          </div>
        </div>

        <div
          v-if="props.username != ''"
          class="text-accent cursor-pointer"
          style="width: fit-content"
          @click="changePassword()"
        >
          Change password
        </div>
      </div>
      <div class="column col-6" style="gap: 16px">
        <div class="column" style="gap: 4px">
          <div class="text_boxes">Email</div>

          <div class="text_description">
            <template v-if="props.email_ != ''">
              {{ props.email_ }}
            </template>
            <template v-else> &nbsp;</template>
          </div>
        </div>
        <div class="column" style="gap: 4px">
          <div class="text_boxes">Username</div>

          <div class="text_description">
            <template v-if="props.login_name != ''"> </template>
            <template v-else> &nbsp;</template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="modal_email" persistent>
    <div class="modal_dialog column">
      <div class="column" style="gap: 10px">
        <div class="row align-center items-center" style="gap: 10px; position: relative">
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
          <div class="title">Email sent</div>
          <svg
            class="cursor-pointer"
            style="position: absolute; right: 0px; top: 0px"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="modal_email = false"
          >
            <path
              d="M12.2858 11.3205L11.1073 12.499L6.39322 7.78496L1.67918 12.499L0.500666 11.3205L5.21471 6.60645L0.500666 1.8924L1.67918 0.713889L12.2858 11.3205ZM12.2858 1.8924L8.75024 5.42793L7.57173 4.24942L11.1073 0.713889L12.2858 1.8924Z"
              fill="#2E2E33"
            />
          </svg>
        </div>

        <div class="text_boxes">
          An email has been sent to the recipient with instructions to reset the password.
        </div>
      </div>
      <div class="row justify-end" style="gap: 10px; width: 100%">
        <q-btn v-close-popup style="width: 100%" no-caps label="Thank you" color="accent" />
      </div>
    </div>
  </q-dialog>
</template>

<style>
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
