import { defineStore } from 'pinia'

import { useJwt } from '@vueuse/integrations/useJwt'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Payload } from '../../types/jwt'
import { useUiStore } from '../ui'

const env = import.meta.env
const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`
const ACCOUNTS_URL = `${env.VITE_ACCOUNTS_URL ?? 'https://pre-accounts.drivania.com/'}`
const cookieName = env.VITE_COOKIE_NAME ?? 'drivaniaCKSC'

function getTokenFromCookie() {
  const cookies = useCookies([cookieName])
  let cookieValue = cookies.get(cookieName)
  //const { payload } = useJwt(cookieValue.token)
  //console.log(payload.value, 'payload.value')

  // Check if token_ttl has expired
  if (cookieValue != undefined) {
    let exp = ''
    if (!cookieValue.exp) {
      exp = cookieValue.exp
    } else {
      exp = cookieValue.token_ttl
    }

    const expirationTime = new Date(exp).getTime()
    const currentTime = new Date().getTime()

    if (currentTime > expirationTime) {
      console.log('Token has expired')
      cookies.remove(cookieName, { path: '/' })
      alert(
        'Cookie expirada, por favor inicia sesión nuevamente y copia la cookie de tu navegador',
      )
      const cookieInput = prompt('Ingresa nueva cookie')
      if (cookieInput != null) {
        const res = JSON.parse(decodeURIComponent(cookieInput))
        cookies.set(cookieName, res, { path: '/' })
        cookieValue = cookies.get(cookieName)
      }
    }
  } else {
    const cookieInput = prompt('Ingresa nueva cookie')
    if (cookieInput != null) {
      const res = JSON.parse(decodeURIComponent(cookieInput))
      cookies.set(cookieName, res, { path: '/' })
      cookieValue = cookies.get(cookieName)
    }
  }

  if (!cookieValue) {
    throw new Error(`Cookie with name ${cookieName} not found`)
  }
  return cookieValue.token
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getTokenFromCookie(),
    payload: null as Payload | null,
    isAuthenticated: false,
    expirationTimer: null as ReturnType<typeof setTimeout> | null,
    expirationTime: null as number | null,
  }),

  actions: {
    initializeStore() {
      if (this.token) {
        const { payload } = useJwt(this.token)
        this.payload = payload.value as Payload
        this.isAuthenticated = true
        this.startExpirationTimer()
      }
    },

    async login(staffId: string) {
      const ui = useUiStore()
      ui.isLoading = true
      //delete cookie
      const cookies = useCookies([cookieName])
      cookies.remove(cookieName, { path: '/' })

      try {
        const response = await fetch(`${API_URL}/login/${staffId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message)

        // Update token
        this.updateToken(data.token)

        ui.isLoading = false
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage =
          error instanceof Error ? error.message : 'Login failed'
        return false
      }
    },

    updateToken(newToken: string) {
      // Remove existing cookie
      const cookies = useCookies([cookieName])
      cookies.remove(cookieName, { path: '/' })

      // Set new cookie and token
      cookies.set(cookieName, { token: newToken }, { path: '/' })
      this.token = newToken

      // Decode JWT
      const { payload } = useJwt(newToken)
      this.payload = payload.value as Payload
      this.isAuthenticated = true

      // Start expiration timer
      this.startExpirationTimer()
    },

    setPayload(token: string) {
      const { payload } = useJwt(token)
      this.payload = payload.value as Payload

      // Start expiration timer when payload is set
      //   this.startExpirationTimer()
    },

    logout() {
      const ui = useUiStore()
      ui.isLoading = true

      const cookies = useCookies([cookieName])
      cookies.remove(cookieName, { path: '/' })

      this.token = null
      this.payload = null
      this.isAuthenticated = false

      // Clear expiration timer
      if (this.expirationTimer) {
        clearTimeout(this.expirationTimer)
        this.expirationTimer = null
      }

      window.location.replace(ACCOUNTS_URL)
    },

    checkAuth() {
      if (!this.payload?.exp) return false
      if (Date.now() / 1000 > this.payload.exp) {
        this.logout()
        return false
      }
      this.isAuthenticated = true
      return true
    },

    startExpirationTimer() {
      // Clear any existing timer
      if (this.expirationTimer) {
        clearTimeout(this.expirationTimer)
      }

      // Check if payload and exp exist
      if (!this.payload?.exp) {
        return
      }

      // Get current time in seconds (same unit as exp)
      const currentTime = Math.floor(Date.now() / 1000)

      // If token is already expired, logout immediately
      if (currentTime >= this.payload.exp) {
        this.logout()
        return
      }

      // Calculate time until expiration in milliseconds
      const timeUntilExp = (this.payload.exp - currentTime) * 1000

      // Set maximum timeout to 24 hours (86400000 ms)
      const maxTimeout = 86400000
      const oneMinute = 60 * 1000

      // If expiration is more than 24 hours away, set a 24-hour refresh timer
      if (timeUntilExp > maxTimeout) {
        this.expirationTimer = setTimeout(() => {
          // Refresh the timer after 24 hours
          this.startExpirationTimer()
        }, maxTimeout)
        return
      }

      // For expiration within 24 hours, set timer to logout one minute before expiration
      const timeoutDuration = Math.max(0, timeUntilExp - oneMinute)
      console.log(
        'Configurando logout automático en',
        timeoutDuration / (60 * 1000),
        'minutos',
      )

      this.expirationTimer = setTimeout(() => {
        console.log('Token próximo a expirar, cerrando sesión')
        this.logout()
      }, timeoutDuration)
    },
  },
})
