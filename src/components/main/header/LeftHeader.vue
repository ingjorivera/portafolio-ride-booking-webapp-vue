<script setup lang="ts">
import router from '../../../router'

function changeRoute(path: string) {
  router.push(path)
}
</script>
<template>
  <div class="row items-center justify-center">
    <img
      src="../../../assets/svg/drivania/logo_header.svg"
      alt="logo"
      class="logo cursor-pointer"
      @click="changeRoute('/rides/new')"
    />
  </div>
</template>
