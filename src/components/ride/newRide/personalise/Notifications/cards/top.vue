<script setup lang="ts">
import editRecipient from '../../forms/editRecipient.vue'
import { ref } from 'vue'
import { useRidesStore } from '@/store'

const ridesStore = useRidesStore()

const props = defineProps({
  index: Number
})

const edit_recipient = ref(false)
const delete_recipient = ref(false)

function deleteRecipient() {
  ridesStore.passengersNotifications.splice(props.index, 1)
  edit_recipient.value = false
  delete_recipient.value = false
}
</script>
<template>
  <div class="column" style="gap: 4px">
    <div class="row justify-between">
      <div class="name">{{ ridesStore.passengersNotifications[props.index].name }}</div>
      <div class="row" style="gap: 8px">
        <q-btn
          unelevated
          dense
          style="background-color: #f2efea; width: 28px; height: 28px"
          @click="edit_recipient = true"
        >
          <i class="drv-edit-02" style="font-size: 16px"></i>
        </q-btn>
        <q-btn
          unelevated
          dense
          style="background-color: #f2efea; width: 28px; height: 28px"
          @click="delete_recipient = true"
        >
          <i class="drv-trash-04" style="font-size: 16px"></i>
        </q-btn>
      </div>
    </div>
    <div class="column description" style="gap: 4px">
      <div>{{ ridesStore.passengersNotifications[props.index].email }}</div>
      <div>{{ ridesStore.passengersNotifications[props.index].phone }}</div>
    </div>
  </div>

  <q-dialog v-model="edit_recipient" persistent>
    <div class="dialog">
      <div class="row justify-between items-center">
        <div>EDIT RECIPIENT</div>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="edit_recipient = false"
        >
          <path
            d="M12.2858 11.3207L11.1073 12.4992L6.39322 7.7852L1.67918 12.4992L0.500666 11.3207L5.21471 6.60669L0.500666 1.89264L1.67918 0.714133L12.2858 11.3207ZM12.2858 1.89264L8.75024 5.42818L7.57173 4.24967L11.1073 0.714133L12.2858 1.89264Z"
            fill="#2E2E33"
          />
        </svg>
      </div>
      <editRecipient :index="props.index" @change="edit_recipient = false" />
    </div>
  </q-dialog>
  <q-dialog v-model="delete_recipient" persistent>
    <div class="dialog column" style="width: 450px; gap: 15px">
      <div class="column justify-center items-center" style="height: 103px">
        <div style="font-size: 25px">Do you want to delete contact?</div>
        <div style="font-size: 15px; color: #58585c">This action can’t be undone</div>
      </div>
      <div class="row" style="gap: 8px">
        <q-btn
          class="col"
          no-caps
          unelevated
          color="primary"
          label="Delete"
          @click="deleteRecipient()"
        />
        <q-btn
          class="col cursor-pointer"
          text-color="black"
          no-caps
          unelevated
          color="primary"
          label="Cancel"
          style="background-color: #e6e2dc !important"
          @click="delete_recipient = false"
        />
      </div>
    </div>
  </q-dialog>
</template>
<style scoped>
.name {
  font-size: 15px;
  color: #747477;
}
.description {
  font-size: 12px;
  line-height: 15.6px;
}
.dialog {
  background-color: #f8f6f4;
  padding: 16px;
  width: 450px;
}
</style>
