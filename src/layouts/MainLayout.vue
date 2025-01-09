<script setup lang="ts">
import LayoutHeader from '../components/main/header/LayoutHeader.vue'
import LayoutFooter from '../components/main/footer/layoutFooter.vue'
</script>

<template>
  <LayoutHeader></LayoutHeader>
  <div class="content">
    <router-view />
  </div>
  <LayoutFooter></LayoutFooter>
</template>
