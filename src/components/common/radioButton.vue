<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  label: String
})

const valor = ref(false)
const selectedIcon = ref('../../assets/svg/icons/radio_selected.svg')
const unselectedIcon = ref('../../assets/svg/icons/radio_unselected.svg')
function selectRadio() {
  valor.value = !valor.value
}
</script>
<template>
  <div class="row items-center" @click="selectRadio">
    <div>{{ props.label }}</div>
    <img
      :src="valor ? selectedIcon : unselectedIcon"
      class="cursor-pointer"
      style="width: 32px; height: 32px; padding: 0; margin: 0"
    />
  </div>
</template>
