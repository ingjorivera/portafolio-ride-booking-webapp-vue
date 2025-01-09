<script setup lang="ts">
import { useUiStore } from '../../../../store/ui'

const uiStore = useUiStore()
</script>
<template>
  <div class="row text-white" style="gap: 20px">
    <div>{{ $t('footer.footer_top.legal_notice') }}</div>

    <div>{{ $t('footer.footer_top.privacy_policy') }}</div>
    <div>{{ $t('footer.footer_top.cookies') }}</div>
    <div>{{ $t('footer.footer_top.terms_and_conditions') }}</div>
    <div>{{ $t('footer.footer_top.social_networks') }}</div>
  </div>
</template>
