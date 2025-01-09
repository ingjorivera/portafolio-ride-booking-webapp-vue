<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useUiStore, useAuthStore } from '../../store'
import { useValidationsStore } from '../../store/validations_user'

const uiStore = useUiStore()
const auth = useAuthStore()
const validations = useValidationsStore()

const emit = defineEmits(['update:phone', 'update:countryCode', 'changePhone'])

const props = defineProps<{
  label: String
  type: String
  phone: String
  countryCode: String
}>()
let labelC = '+'
const phoneValue = computed({
  get: () => props.phone,
  set: (value) => {
    emit('update:phone', value)
  }
})

const countryCodeValue = computed({
  get: () => props.countryCode,
  set: (value) => {
    emit('update:countryCode', value)
  }
})

let errorPhone = ref(false)

const v$ = validations.validateInputs({
  phone: props.phone
})

function setCountry(value: string) {
  labelC = ''
  emit('update:countryCode', value)
}

async function checkPhone() {
  const number = phoneValue.value
  const code = countryCodeValue.value.phoneCode

  if (number.length > 4 && code) {
    const cleanCode = code.replace('+', '')

    if (number.match(/^\d+$/)) {
      try {
        const isValid = await uiStore.validatePhone(number, auth.token, cleanCode, 'phone')
        console.log('Validación del teléfono:', isValid)

        if (isValid.isValid) {
          emit('changePhone', cleanCode + number)
          errorPhone.value = false
        } else {
          errorPhone.value = true
        }

        return isValid
      } catch (error) {
        console.error('Error validando el teléfono:', error)
        return false
      }
    }
  }
  return false
}
</script>

<template>
  <div class="row" style="gap: 1px">
    <q-select
      :model-value="countryCodeValue"
      filled
      dropdown-icon="fas drv-chevron-down"
      square
      dense
      outlined
      :options="uiStore.api_countries_sorted_phoneCodes"
      option-label="phoneCode"
      option-value="phoneCode"
      style="width: 70px"
      @update:model-value="setCountry"
      :label="labelC"
    />

    <q-input
      :model-value="phoneValue"
      square
      dense
      filled
      :label="label"
      :error="!uiStore.valid_phone"
      style="width: calc(100% - 71px)"
      :disable="props.disable"
      @update:model-value="(value) => emit('update:phone', value)"
      @blur="checkPhone"
    >
      <template v-if="errorPhone" #append>
        <q-icon name="fa drv-alert-triangle text-negative">
          <q-tooltip class="bg-negative" :offset="[10, 10]"> Phone number incorrect </q-tooltip>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
