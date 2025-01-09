import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profiles } from '../../types/profiles'
import { useUiStore } from '../ui'
import { useAuthStore } from './auth'

const env = import.meta.env
const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

export const useStaffStore = defineStore('staff', {
  state: () => ({
    staffList: ref<Profiles[]>([]),
    currentPage: ref(1),
    searchKeyword: ref(''),
    currentStaff: ref<Profiles>({
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
      login_name: '',
    }),
  }),

  actions: {
    async getStaffs() {
      const ui = useUiStore()
      const auth = useAuthStore()

      if (this.currentPage === 1) {
        this.staffList = []
      }

      ui.isLoading = true

      try {
        const response = await fetch(
          `${API_URL}/staffs?page=${this.currentPage}&name=${this.searchKeyword}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok) throw new Error('Error fetching staff')

        ui.isLoading = false

        if (this.currentPage === 1) {
          if (data.length === 0) {
            this.staffList = []
            return true
          }
          this.staffList = data
          return false
        } else {
          if (data.length === 0) return true
          this.staffList.push(...data)
          return false
        }
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting staff'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return true
      }
    },

    async getStaffById(id: number) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/staffs/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error('Error fetching staff member')

        ui.isLoading = false
        this.currentStaff = data[0]
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting staff member'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
      }
    },

    async createStaff(staffData: {
      name: string
      email: string
      phone: string
      mobile: string
      username: string
    }) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/staffs`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(staffData),
        })

        if (!response.ok) throw new Error('Error creating staff member')

        ui.isLoading = false
        ui.createNotification(
          'Created successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        await this.getStaffs()
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error creating staff member'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },

    async updateStaff(
      id: number,
      staffData: {
        name: string
        email: string
        phone: string
        mobile: string
      },
    ) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/staffs/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(staffData),
        })

        if (!response.ok) throw new Error('Error updating staff member')

        ui.isLoading = false
        ui.createNotification(
          'Saved successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error modifying staff member'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },

    async deleteStaff(id: number) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/staffs/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        if (!response.ok) throw new Error('Error deleting staff member')

        ui.isLoading = false
        ui.createNotification(
          'Deleted successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error deleting staff member'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },

    async changeStaffPassword(id: number, username: string) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(
          `${API_URL}/staffs/${id}/change-password`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${auth.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              service: 'booking',
            }),
          },
        )

        if (!response.ok) throw new Error('Error changing password')

        ui.isLoading = false
        ui.createNotification(
          'Password changed successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error changing password'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },
  },
})
