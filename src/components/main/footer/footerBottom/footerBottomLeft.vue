<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/store/ui'
import { useI18n } from 'vue-i18n'

const uiStore = useUiStore()
const { locale } = useI18n()
const item = ref('')
const current = ref('')
if (uiStore.langSelected == 'en') {
  current.value = 'English'
  item.value = 'Spanish'
} else {
  current.value = 'Spanish'
  item.value = 'English'
}

const options = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
]

function changeLanguage(selectedItem: string) {
  const selection = options.find(item => item.label === selectedItem)
  if (selection != null) {
    uiStore.langSelected = selection.value as 'en' | 'es'
    locale.value = uiStore.langSelected
  }

  item.value = current.value
  current.value = selectedItem
}
</script>
<template>
  <div class="row text-white">
    <div>
      <div class="row items-center justify-center handCursor" style="gap: 10px">
        <div style="font-size: 15px">{{ current }}</div>
        <i class="drv-chevron-up text-white" style="font-size: 20px"></i>
      </div>
      <q-menu>
        <q-list dense>
          <q-item v-close-popup clickable @click="changeLanguage(item)">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
  </div>
</template>
