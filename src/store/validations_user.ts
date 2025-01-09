import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  customRequired as required,
  customMinLength as minLength,
  customMaxLength as maxLength,
  customEmail as email,
  customNumeric as numeric
} from './customValidators'
import { useDebounceFn } from '@vueuse/core'

export const useValidationsStore = defineStore('validations', () => {
  const rules = {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30),
      $autoDirty: true
    },
    phone: {
      minLength: minLength(10),
      maxLength: maxLength(15),
      numeric
    },
    mobile: {
      minLength: minLength(10),
      maxLength: maxLength(15),
      numeric
    },
    email: {
      email,
      required
    },
    username: {
      required,
      minLength: minLength(0),
      maxLength: maxLength(30)
    },
    taxNumber: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(15)
    },
    city: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    postal_code: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(10),
      numeric
    },
    address: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    county: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    country_code: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(30),
      numeric
    }
  }
  const validateInputs = (fields) => {
    const v$ = useVuelidate(rules, fields)

    return v$
  }

  return {
    validateInputs
  }
})
