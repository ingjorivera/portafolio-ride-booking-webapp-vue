<script setup lang="ts">
import LeftHeader from './LeftHeader.vue'
import RightHeader from './RightHeader.vue'
</script>
<template>
  <div class="header_layout justify-between">
    <LeftHeader />
    <RightHeader />
  </div>
</template>

<style scoped>
.header_layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  padding: 30px 24px 30px 24px;
}
</style>
