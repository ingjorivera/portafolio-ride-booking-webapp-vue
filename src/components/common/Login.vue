<script setup lang="ts">
import { ref } from 'vue'
import AddUser from './AddUser.vue'

import { useAuthStore, useUiStore, useStaffStore } from '../../store/index'

import { useUserStore } from '../../store/user'
import profilesInput from './profilesInput.vue'

const emit = defineEmits({ changeStaff: null })
const uiStore = useUiStore()
const authStore = useAuthStore()
const staffStore = useStaffStore()

const user = useUserStore()

await staffStore.getStaffs()

const model = ref('')
const label_ = ref('Select profile')
const id_sel = ref(0)
async function changeStaff() {
  await authStore.login(id_sel.value.toString())

  emit('changeStaff')
}

function selectionStaff(profile) {
  console.log(profile, 'profile--------')

  user.userInfo = profile
  id_sel.value = profile.id
  model.value = ''
  label_.value = 'Select profile'
}
function add() {
  model.value = 'add_profile'
  label_.value = 'Add user profile'
}
</script>
<template>
  <div class="column" style="gap: 10px">
    <div class="title_modal">
      {{ $t('texts.whos_there') }}
    </div>
    <div>{{ $t('texts.please_identify_yourself') }}</div>
  </div>
  <div class="column" style="gap: 24px">
    <div class="column" style="gap: 8px">
      <profilesInput
        :label="$t('input.labels.select_profile')"
        @change="selectionStaff"
        @add="add"
      />

      <div v-if="model == 'add_profile'">
        <AddUser />
      </div>
    </div>

    <q-btn
      v-if="model != 'add_profile'"
      unelevated
      square
      padding="sm"
      class="bg-primary"
      text-color="white"
      no-caps
      :label="
        model.value == 'add_profile'
          ? $t('buttons.add_user_profile')
          : $t('buttons.thats_me')
      "
      style="width: 100%"
      :loading="uiStore.isLoading"
      :disable="uiStore.isLoading"
      @click="changeStaff()"
    />
  </div>
</template>
