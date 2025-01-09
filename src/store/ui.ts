import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { Notify } from 'quasar'
import { useFetch } from '@vueuse/core'
import { type Countries } from '../types/countries'
import translationsUI from '../data/translations-ui.json'
import countries from '../data/countryCodes.json'
import regions from '../data/regionCodes.json'
import countriesData from '../data/countries.json'
import { useI18n } from 'vue-i18n'

const env = import.meta.env

const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoading: ref(false),
    isError: ref(false),
    errorMessage: ref(''),
    isSuccess: ref(false),
    successMessage: ref(''),
    isInfo: ref(false),
    infoMessage: ref(''),
    isWarning: ref(false),
    warningMessage: ref(''),
    langSelected: ref('EN'),
    translationsUI: ref({}),
    codes: ref<Array<{ label: string; value: string | number }>>([]),
    countries: ref<
      Array<{ label: string; value: string | number; name: string }>
    >([]),
    countries_labels: ref<Array<{ label: string; value: string | number }>>([]),
    regions: ref<Array<{ label: string; value: string | number }>>([]),
    rideType: ref('oneway'),
    countryList: ref<
      Array<{ name: string; phoneCode: string | number; label: string }>
    >([]),
    currentTab: ref('step1'),
    api_countries: [] as Countries[],
    api_countries_sorted_names: [] as Countries[],
    api_countries_sorted_phoneCodes: [] as Countries[],
    valid_phone: ref(true),
    valid_mobile: ref(true),
    scrollReset: ref(false),
    uiScroll: ref(false),
    scroll: null,
    selectedScroll: ref(0),
    currency: ref({ id: 0, name: '', code: '', symbol: '', '': null }),
  }),
  actions: {
    setScroll(ref: null) {
      this.scroll = ref
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    setError(errorMessage: string) {
      this.isError = true
      this.errorMessage = errorMessage
    },
    setSuccess(successMessage: string) {
      this.isSuccess = true
      this.successMessage = successMessage
    },
    setInfo(infoMessage: string) {
      this.isInfo = true
      this.infoMessage = infoMessage
    },
    setWarning(warningMessage: string) {
      this.isWarning = true
      this.warningMessage = warningMessage
    },
    setLanguage() {
      const i18n = useI18n()
      i18n.locale.value = this.langSelected
    },
    setTranslationsUI(langSelected: 'EN' | 'ES') {
      const result: { [key: string]: any } = {}
      for (const [key, value] of Object.entries(translationsUI)) {
        result[key] = value.map(item => ({
          [langSelected]: item[langSelected],
        }))
      }

      this.translationsUI = result
    },
    async getCountries(token: string) {
      this.isLoading = true
      const { error, data } = await useFetch(API_URL + '/location/country', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      })
        .get()
        .json()
      if (error.value) {
        this.isError = true
        this.isLoading = false
        this.errorMessage = 'Error getting countries'
        this.createNotification(
          this.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        this.isLoading = false
        ////console.log(data.value);
        if (data.value.length == 0) {
          this.api_countries = countriesData.countries as Countries[]
        } else {
          this.api_countries = data.value
        }
        this.sortCountries()
        //console.log(this.api_countries_sorted_names,'this.api_countries_sorted_names')
        //console.log(this.api_countries_sorted_phoneCodes,'this.api_countries_sorted_phoneCodes')
      }
    },

    sortCountries() {
      const rawCountries = toRaw(this.api_countries)

      // Sort by name alphabetically
      this.api_countries_sorted_names = rawCountries
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))

      // Sort by phone code numerically
      this.api_countries_sorted_phoneCodes = rawCountries
        .filter(
          country =>
            typeof country.phoneCode === 'string' &&
            country.phoneCode.trim() !== '',
        )
        .sort((a, b) => {
          const sanitize = (phoneCode: string) => phoneCode.replace(/\D/g, '')

          const phoneCodeA = parseInt(sanitize(a.phoneCode), 10)
          const phoneCodeB = parseInt(sanitize(b.phoneCode), 10)

          return phoneCodeA - phoneCodeB
        })
        .map(country => {
          return {
            ...country,
            phoneCode: `+${country.phoneCode.replace(/\D/g, '')}`,
          }
        })
    },
    //validate phone number using post /phone/validation
    getCountryCode(country: string) {
      let countryCode = 0
      for (let i = 0; i < this.api_countries_sorted_phoneCodes.length; i++) {
        if (this.api_countries_sorted_phoneCodes[i].name == country) {
          countryCode = this.api_countries_sorted_phoneCodes[i].id
          break
        }
      }

      return countryCode
    },
    getCountryName(countryID: number) {
      let countryName = ''
      for (let i = 0; i < this.api_countries_sorted_names.length; i++) {
        if (this.api_countries_sorted_names[i].id == countryID) {
          countryName = this.api_countries_sorted_names[i].name
          break
        }
      }

      return countryName
    },

    async validatePhone(
      phoneNumber: string,
      token: string,
      country: string,
      type: string,
    ) {
      this.isLoading = true
      const phone_post = country + phoneNumber

      try {
        const response = await fetch(`${API_URL}/phone/validation`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
          body: JSON.stringify({ phone: phone_post }),
        })

        const data = await response.json()
        this.isLoading = false

        if (response.status === 200) {
          console.log(data.phone, 'data phone res')
          let isValid = false
          if (data.phone != false) {
            isValid = true
          }
          let result = {}

          if (type === 'phone') {
            result = { type: 'phone', isValid: isValid }
          } else {
            result = { type: 'mobile', isValid: isValid }
          }

          return result
        }

        return false
      } catch (error) {
        this.isLoading = false
        //console.error('Error validating phone:', error)
        const errorMessage = 'Error validating phone:'
        this.createNotification(
          this.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )

        return false
      }
    },
    fillCodes() {
      for (const r of regions) {
        this.regions.push({
          label: r.name,
          value: r.id,
        })
      }

      for (const c of countries) {
        this.countries.push({
          label: c.dial_code,
          value: c.dial_code,
          name: c.name,
        })
      }
      for (const c of countries) {
        this.countries_labels.push({
          label: c.name,
          value: c.dial_code,
        })
      }
      const countries_sort = this.countries.sort((a, b) => {
        return (
          parseInt(String(a.value).substring(1)) -
          parseInt(String(b.value).substring(1))
        )
      })

      for (const c of countries_sort) {
        this.codes.push({
          label: String(c.value),
          value: c.value,
        })
        this.countryList.push({
          name: c.label,
          phoneCode: c.value,
          label: c.name,
        })
      }

      //console.log(this.codes,'codes')
      //console.log(this.countryList,'countryList')
    },
    separateCountryCodeAndPhone(phoneNumber: string) {
      if (phoneNumber != undefined) {
        for (let i = 3; i > 0; i--) {
          // console.log(phoneNumber, 'phoneNumber------')
          const prefix = '+' + phoneNumber.substring(0, i)
          const localPhone = phoneNumber.substring(i)
          // console.log(prefix, 'prefix')
          for (const country of this.api_countries_sorted_phoneCodes) {
            /// console.log(country.phoneCode, 'country.phoneCode------------')
            if (country.phoneCode == prefix) {
              return {
                countryCode: prefix,
                phoneNumber: localPhone,
              }
            }
          }
        }
      }

      return {
        countryCode: '',
        phoneNumber: phoneNumber,
      }
    },
    createNotification(
      message: string,
      color: string,
      position:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'center'
        | undefined,
      icon: string,
    ) {
      Notify.create({
        message: message,
        color: color,
        position: position,
        actions: [
          {
            icon: 'fa drv-x-close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      })
    },
    convertDate(datetime: string) {
      //convert date and time from 2024-10-10T16:00:00+0000 to october 10 16:00 return two variables

      const date = datetime.slice(0, 10)
      const time = datetime.slice(11, 16)

      //convert 2024-10-10 to 'October 10'
      const dateObj = new Date(date)
      const options = { month: 'long', day: 'numeric' }
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
        dateObj,
      )

      //console.log(formattedDate,'formattedDate')

      return [formattedDate, time]
    },
  },
})
