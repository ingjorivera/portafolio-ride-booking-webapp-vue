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

export const useValidationsService = defineStore('validations', () => {
  const rules = {
    pickup: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    dropoff: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    date: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    pickup_time: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(10)
    },
    dropoff_time: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(10)
    },
    passenger_name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    passenger_email: {
      required,
      email
    },
    passenger_phone: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(15),
      numeric
    },
    additional_info: {
      minLength: minLength(3),
      maxLength: maxLength(150)
    },
    booking_id: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    management_fee: {
      required,
      numeric,
      minLength: minLength(1),
      maxLength: maxLength(3)
    }
  }
  const validateInputs = (fields) => {
    const v$ = useVuelidate(rules, fields)
    const debouncedValidate = useDebounceFn(() => {
      v$.value.$touch()
    }, 300)

    watch(Object.values(fields), debouncedValidate)

    return v$
  }

  return {
    validateInputs
  }
})
