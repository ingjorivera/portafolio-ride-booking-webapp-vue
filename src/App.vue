<script setup lang="ts">
import router from './router/index'
import Login from './components/common/Login.vue'
import { ref } from 'vue'

import { useAuthStore, useClientsStore } from './store'

const authStore = useAuthStore()
const clientsStore = useClientsStore()

const confirm = ref<boolean>(false)

if (!authStore.payload?.sid) {
  confirm.value = true
} else {
  clientsStore.searchClientsID(authStore.payload.cid)
}
router.push('/rides/new')
</script>

<template>
  <div>
    <router-view />
  </div>
  <q-dialog v-model="confirm" persistent>
    <div class="modal_layout bg-secondary">
      <Suspense>
        <Login @change-staff="confirm = false"></Login>
      </Suspense>
    </div>
  </q-dialog>
</template>
