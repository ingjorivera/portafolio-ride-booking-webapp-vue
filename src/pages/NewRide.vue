<script setup lang="ts">
import Services from '../pages/Services.vue'
import rideTabs from '../components/ride/newRide/rideTabs.vue'
</script>
<template>
  <div class="newRide column">
    <rideTabs></rideTabs>
  </div>
  <Services />
</template>
<style scoped>
.newRide {
  padding: 0px 24px 0px 24px;
  gap: 40px;
}
.newRideTabs {
  height: 333px;
}
</style>
