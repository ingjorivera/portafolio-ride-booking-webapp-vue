import { useServicesStore } from './services'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useUiStore } from './ui'
import { Ref, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Payload } from '../types/jwt'
import { useCookies } from '@vueuse/integrations/useCookies'
import { Profiles } from '../types/profiles'
import router from '../router'

const env = import.meta.env

const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`
const ACCOUNTS_URL = `${env.VITE_ACCOUNTS_URL ?? 'https://pre-accounts.drivania.com/'}`
const cookieName = env.VITE_COOKIE_NAME ?? 'drivaniaCKSC'

function getTokenFromCookie() {
  const cookies = useCookies([cookieName])
  let cookieValue = cookies.get(cookieName)

  if (!cookieValue) {
    console.log('cookie no encontrada, se asigna una cookie')
    const cookieRaw =
      '%7B%22token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpY19hcGlfZ2F0ZXdheSJ9.eyJ1aWQiOjIwMjQzLCJ1bmEiOiJqb3JpdmVyYSIsImV4cCI6MTczMTg0NDg2MSwiaWF0IjoxNzMxODQxMjYxLCJwbGF0Zm9ybXMiOlsiYm8iLCJhcGliIl0sImNpZCI6NDE2ODMsInNpZCI6bnVsbCwiZW1haWwiOiJqb3JpdmVyYUBkcml2YW5pYS5jb20iLCJzbmEiOiJGcm9udGVuZCBkZXZlbG9wZXIiLCJzdWlkIjpudWxsfQ.NCobRu4YmLNSdt4qd_kPrON3kpDQaa32Qc__ouB7zzQqV_KsicSS50MqrqPxmAyOWW_5Jl_sZLff35EJ3qAEuZKjRPefWnyjWBNFoZ32txORswj06j6ZQ2GtGY4oJqnUSRuU7mumlpnYXKuJZobm-mzDtesXv1_nK-VN32x13A4%22%2C%22token_ttl%22%3A%222024-11-17T13%3A01%3A01%2B0100%22%2C%22username%22%3A%22jorivera%22%2C%22remember%22%3Afalse%7D'
    const res = JSON.parse(decodeURIComponent(cookieRaw))
    cookies.set(cookieName, res, { path: '/' })
    cookieValue = cookies.get(cookieName)
  }

  if (!cookieValue) {
    throw new Error(`Cookie with name ${cookieName} not found`)
  }
  console.log(cookieValue.token, 'cookieValue.token')
  return cookieValue.token
}

function removeCookie() {
  const cookies = useCookies([cookieName])
  cookies.remove(cookieName, { path: '/' })
}

export const useApiStore = defineStore('api', {
  state: (): {
    loginStaff: string
    listStaffs: string
    staffs: string
    clients: string
    payload: Payload | null
    token: string | null
    loginToken: string
    listStaffO: Profiles[]
    profile_sel: Profiles
  } => {
    return {
      loginStaff: `${API_URL}/login/`,
      listStaffs: `${API_URL}/staffs`,
      staffs: `${API_URL}/staffs`,
      clients: `${API_URL}/clients`,
      payload: {
        uid: 0,
        una: '',
        exp: 0,
        iat: 0,
        platforms: [],
        sid: null,
        sna: '',
        suid: null,
        cid: 0,
        cna: '',
        email: ''
      },
      token: null,
      loginToken: getTokenFromCookie(),
      listStaffO: [],
      profile_sel: {
        id: 0,
        name: '',
        email: { email: '', emails: [] },
        client_id: 0,
        status: { id: 0, name: '' },
        phone: '',
        mobile: '',
        username: '',
        language_id: 0,
        deleted_at: null,
        user_administrator: false,
        login_name: ''
      }
    }
  },
  actions: {
    async listStaffs(token: string) {
      const user = useUserStore()
      const ui = useUiStore()
      ui.isLoading = true

      const { error, data } = await useFetch(API_URL + '/staffs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .get()
        .json()

      if (error.value) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = error.value.message
        return
      }

      if (Array.isArray(data.value)) {
        user.listStaffs = data.value.map((staff) => ({
          id: staff.id,
          name: staff.name,
          email: staff.email,
          client_id: staff.client_id,
          status: staff.status,
          phone: staff.phone,
          mobile: staff.mobile,
          username: staff.username,
          language_id: staff.language_id,
          deleted_at: staff.deleted_at
        }))

        ui.isLoading = false
        user.addListLogin()
      } else {
        user.listStaffs = []
        ui.isLoading = false
      }
    },

    async loginStaff(token: string, id: string) {
      const user = useUserStore()
      const ui = useUiStore()
      ui.isLoading = true
      if (this.payload) user.userStaff = this.payload.una
      const { error, data } = await useFetch(API_URL + '/login/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .post()
        .json()

      if (error.value) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = error.value.message
        return
      }

      user.listStaffs = []
      ui.isLoading = false
      console.log(data.value, 'data.value')
      // Remove existing cookie
      removeCookie()

      // Set new cookie
      const cookies = useCookies([cookieName])
      cookies.set(cookieName, data.value, { path: '/' })

      const t = ref(data.value.token)
      this.loginToken = data.value.token
      this.token = data.value.token

      this.decodeJWT(t)
    },
    async getClientByID(id: number) {
      const user = useUserStore()

      const { error, data } = await useFetch(API_URL + '/clients/' + id, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .get()
        .json()
      if (error.value) {
        console.log(error.value)
        return
      } else {
        console.log(data.value)
        user.currentUserInfo = data.value[0]
        return
      }
    },

    decodeJWT(token: Ref<string>) {
      const user = useUserStore()
      const { payload } = useJwt(token.value)

      if (payload.value && typeof payload.value === 'object' && 'uid' in payload.value) {
        user.payload = payload.value as {
          cid: number
          cna: string
          email: string
          exp: number
          iat: number
          platforms: string[]
          sid: null
          sna: string
          suid: null
          uid: number
          una: string
        }

        user.user = user.payload.sna || 'none'
      } else {
        user.payload = null
      }
    },

    checkJWTexpiration() {
      const user = useUserStore()
      if (user.payload?.exp) {
        if (Date.now() / 1000 > user.payload.exp) {
          removeCookie()
          return true
        }
      }
      return false
    },

    logOut() {
      const user = useUserStore()
      this.loginToken = ''
      user.token = ''
      user.payload = null
      removeCookie()
      window.location.replace(ACCOUNTS_URL)
    },

    async getStaffsFirstTime(page: number, limit: number, name: string) {
      const uiStore = useUiStore()

      uiStore.isLoading = true
      this.listStaffO = []

      const { error, data } = await useFetch(
        API_URL + '/staffs?page=' + page + '&limit=' + limit + '&name=' + name,
        {
          headers: {
            Authorization: `Bearer ${this.loginToken}`
          }
        }
      )
        .get()
        .json()

      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting staffs'
        uiStore.createNotification(uiStore.errorMessage, 'negative', 'top', 'drv-alert-triangle')
        return
      } else {
        uiStore.isLoading = false
        const mappedUsers = data.value.map((user: { id: number; name: string }) => ({
          value: user.id,
          label: user.name
        }))
        return mappedUsers
      }
    }
  }
})
