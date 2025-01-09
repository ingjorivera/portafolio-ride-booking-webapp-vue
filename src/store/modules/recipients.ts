import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUiStore } from '../ui'
import { useAuthStore } from './auth'
import type { ClientByID } from '../../types/clientRes'
import type { Contact } from '@/types/bs'
import type { ContactsRes } from '@/types/contactsRes'
import type { ClientsGet } from '@/types/clientsGet'
import type { PassengerRes } from '@/types/passengers'

const env = import.meta.env
const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: ref<ClientsGet[]>([]),
    selectedClient: ref<ClientsGet>(),
    contacts: ref<Contact[]>([]),
    currentPage: ref(1),
    searchKeyword: ref(''),
    selectedClientId: ref<number>(),
    contactsRes: ref<ContactsRes[]>([]),
    currentClientInfo: ref<ClientByID>(),
    passengers: ref<PassengerRes[]>([]),
    billingInfo: ref({
      type: '',
      bank_transfer: false,
      credit_card: false,
      info: {
        name: '',
        address: '',
        tax_id: '',
        zip_code: '',
        country: {
          name: '',
          id: '',
        },
      },
    }),
    creditCard: ref({
      type: '',
      number: '',
      expiration: '',
      cvc: '',
      holder_name: '',
    }),
  }),

  actions: {
    async getClients() {
      const ui = useUiStore()
      const auth = useAuthStore()

      if (this.currentPage === 1) {
        this.clients = []
      }

      ui.isLoading = true

      try {
        const response = await fetch(
          `${API_URL}/clients?page=${this.currentPage}&name=${this.searchKeyword}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            cache: 'no-cache',
          },
        )

        const data = await response.json()

        if (!response.ok) throw new Error('Error fetching clients')

        ui.isLoading = false

        if (this.currentPage === 1) {
          if (data.data.length === 0) {
            this.clients = []
            return true
          }
          this.clients = data.data
          return false
        } else {
          if (data.data.length === 0) return true
          this.clients.push(...data.data)
          return false
        }
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting clients'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return true
      }
    },
    async getPassengers(name: string) {
      const ui = useUiStore()
      const auth = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/passengers?name=${name}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        const data = await response.json()
        if (response.status === 200) {
          ui.isError = false
          ui.isLoading = false
          this.passengers = data
          console.log(this.passengers, 'passengers')
          return false
        }
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting clients'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return true
      }
    },
    async createContact(contactData: Contact) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/clients`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        })

        //const data = await response.json()

        if (!response.ok) throw new Error('Error creating client')

        ui.isLoading = false
        ui.createNotification(
          'Created successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )

        await this.getClients()
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error creating client'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },
    async searchContactsByName(name: string) {
      const ui = useUiStore()
      const auth = useAuthStore()

      try {
        const response = await fetch(
          `${API_URL}/client-contacts?text=${name}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        const data = await response.json()
        if (response.status === 200) {
          ui.isError = false
          ui.isLoading = false
          this.contactsRes = data
          console.log(this.contactsRes, 'contactos')
          return false
        }
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting clients'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return true
      }
    },
    async searchClientsID(id: number) {
      const ui = useUiStore()
      const auth = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const data = await response.json()

        //if (!response.ok) throw new Error('Error searching clients by ID')

        if (data.length === 0) {
          this.clients = []
          return 'No clients found'
        }
        console.log(data, 'data.data')
        this.currentClientInfo = data
        ui.currency = data.currency

        return null
      } catch (error) {
        console.log(error, 'error')
        ui.isError = true
        ui.errorMessage = 'Error searching clients'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return 'Error searching clients'
      }
    },

    async searchClientsByName(name: string) {
      const ui = useUiStore()
      const auth = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/clients?name=${name}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error('Error searching clients')

        if (data.length === 0) {
          this.clients = []
          return 'No clients found'
        }

        this.clients = data.data
        return null
      } catch (error) {
        ui.isError = true
        ui.errorMessage = 'Error searching clients'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return 'Error searching clients'
      }
    },

    async createClient(clientData: {
      name: string
      taxNumber: string
      country_code: number
      county: string
      city: string
      postal_code: string
      address: string
      phone: string
      email: string
    }) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/clients`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: clientData.name,
            phone: clientData.phone,
            email: clientData.email,
            tax: clientData.taxNumber,
            address: clientData.address,
            postcode: clientData.postal_code,
            city: clientData.city,
            country_id: parseInt(clientData.country_code.toString()),
            county: clientData.county,
          }),
        })

        const data = await response.json()

        if (!response.ok) throw new Error('Error creating client')

        ui.isLoading = false
        ui.createNotification(
          'Created successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )

        await this.getClients()
        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error creating client'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },

    async updateClient(
      id: string,
      clientData: {
        name: string
        taxNumber: string
        email: string
        phone: string
        country_id: number
        county: string
        city: string
        postal_code: string
        address: string
      },
    ) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/clients/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        })

        if (!response.ok) throw new Error('Error updating client')

        ui.isLoading = false

        return true
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error modifying client'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },

    async deleteClient(id: number) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/clients/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        if (!response.ok) throw new Error('Error deleting client')

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
        ui.errorMessage = 'Error deleting client'
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
