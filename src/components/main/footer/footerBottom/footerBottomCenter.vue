<script setup lang="ts">
import { useUiStore } from '../../../../store/ui'
</script>
<template>
  <div class="row text-white" style="gap: 20px">
    <div>info@drivania.com</div>
    <q-separator vertical inset />
    <div>{{ $t('footer.footer_bottom.contact_number') }}</div>
    <q-separator vertical inset />
    <div>{{ $t('footer.footer_bottom.contact_number2') }}</div>
    <q-separator vertical inset />
    <div>{{ $t('footer.footer_bottom.contact_number3') }}</div>
  </div>
</template>
