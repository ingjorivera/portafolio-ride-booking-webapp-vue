<script setup>
import { ref } from 'vue'
import { useServicesStore } from '../../../store/services'
import { useUiStore } from '../../../store/ui'

const listaOriginal = ref([])
const search = ref('')
const services = useServicesStore()
const uiStore = useUiStore()
const props = defineProps({
  editMode: Boolean,
  loading: Boolean,
  user: String,
  type: String
})

const emit = defineEmits({
  changeEditMode: null,
  changeCustomer: null
})
const modal_dialog_delete = ref(false)

function deleteClient() {
  services.deleteStaff(services.selectedID).then((res) => {
    uiStore.setLoading(false)
    modal_dialog_delete.value = false
    uiStore.scroll.resume()
    services.listStaffs = []
    uiStore.scroll.reset()

    //uiStore.scroll.trigger()
    //uiStore.scroll.reset()

    services.currentPage = 1
    //uiStore.scroll.resume()

    //services.getClients()
    uiStore.scroll.trigger()

    return
  })
}

function filter(value) {
  if (value.length > 2) {
    uiStore.scroll.resume()
    services.listClients = []
    uiStore.scroll.reset()

    //uiStore.scroll.trigger()
    //uiStore.scroll.reset()

    services.searchKeyword = value
    services.currentPage = 1
    //uiStore.scroll.resume()
    console.log('hace todo 1')
    //services.getClients()
    uiStore.scroll.trigger()

    return
  } else if (value.length == 0) {
    services.listClients = []
    uiStore.scroll.reset()
    services.searchKeyword = ''
    services.currentPage = 1
    uiStore.scroll.resume()
    uiStore.scroll.trigger()

    console.log('hace todo 2')
    return

    // services.getClients(1).then(()=>{
    //   services.getClients(2).then(()=>{
    //     uiStore.scrollReset=true
    //   })
    // })
  }
  // if()
  // if (!listaOriginal.value.length) {

  //   listaOriginal.value = [...services.listClients];
  // }
  // services.listClients = listaOriginal.value.filter((client) =>
  //   client.name.toLowerCase().includes(search.value.toLowerCase())
  // );
}

function clearFilter() {
  if (listaOriginal.value.length) {
    services.listClients = [...listaOriginal.value]
  }
}
</script>
<template>
  <div class="column top-module border2" style="height: 178px; gap: 20px; width: 100%">
    <div class="title">Users profiles</div>

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
          label="New user profile"
          style="width: 100%"
          @click="emit('changeEditMode', 'create', true)"
        />
        <q-input
          v-model="search"
          square
          dense
          outlined
          :disable="props.loading"
          label="Search"
          style="width: 100%"
          debounce="500"
          @update:model-value="filter"
        >
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
            :loading="uiStore.isLoading"
            :disable="uiStore.isLoading"
            @click="deleteClient()"
          >
            <template #loading>
              <q-spinner />
            </template>
          </q-btn>
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
