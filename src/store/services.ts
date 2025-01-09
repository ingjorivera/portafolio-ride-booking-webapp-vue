import type { Collection } from './../types/quotesResult'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { get, useFetch } from '@vueuse/core'
import { useUiStore } from './ui'
import type { Segment, Quote, Quotes } from '../types/rides'
import { useUserStore } from './user'
import type { Fbos } from '../types/flight'
import type { QuoteUser } from '../types/quoteUser'

const uiStore = useUiStore()
const user = useUserStore()
const env = import.meta.env
const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

export const useServicesStore = defineStore('services', {
  state: () => ({
    listClients: ref<any[]>([]),
    listStaffs: ref<any[]>([]),
    listLocations: ref<any[]>([]),
    listFbos: ref<Fbos[]>([]),
    selectedID: ref(''),
    listClientsPage: ref(0),
    listStaffsPage: ref(0),
    searchKeyword: ref(''),
    currentPage: ref(1),
  }),
  actions: {
    async getClients() {
      const user = useUserStore()
      if (this.listClientsPage == 1) {
        this.listClients = []
      }

      uiStore.isLoading = true
      const { error, data } = await useFetch(
        API_URL + '/name=' + this.searchKeyword,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .get()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting clients'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        if (data.value.length == 0) {
          uiStore.createNotification(
            'No clients found',
            'negative',
            'top',
            'drv-alert-triangle',
          )
        }
        if (this.currentPage == 1) {
          if (data.value['data'].length == 0) {
            this.listClients = []
            return true
          } else {
            this.listClients = data.value['data']
            return false
          }
        } else {
          if (data.value['data'].length == 0) {
            return true
          } else {
            //cicle through the data and add it to the list
            for (let i = 0; i < data.value['data'].length; i++) {
              this.listClients.push(data.value['data'][i])
            }
            return false
          }
        }

        //console.log(this.listClients, "this.listClients");
      }
      ////console.log(data,'data')
      //uiStore.isLoading=false
      // this.listClients.push(data.value)
      ////console.log(this.listClients)
    },
    async getClientsByName(name: string) {
      const user = useUserStore()
      const { error, data } = await useFetch(
        API_URL + '/clients?name=' + name,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .get()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting clients'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        //console.log(data.value);
        if (data.value['data'].length == 0) {
          this.listClients = []
          return 'No clients found'
        } else {
          this.listClients = []
          //cicle through the data and add it to the list
          for (let i = 0; i < data.value['data'].length; i++) {
            this.listClients.push(data.value['data'][i])
          }
        }
      }
    },
    async modifyClient(
      id: string,
      name: string,
      taxNumber: string,
      email: string,
      phone: string,
      country_id: number,
      county: string,
      city: string,
      postal_code: string,
      address: string,
    ) {
      const user = useUserStore()
      uiStore.isLoading = true
      const ccode = parseInt(country_id.toString())
      const { error, data, statusCode, onFetchFinally } = await useFetch(
        API_URL + '/clients/' + id,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .patch({
          name: name,
          taxNumber: taxNumber,
          email: email,
          phone: phone,
          country_id: ccode,
          county: county,
          city: city,
          postal_code: postal_code,
          address: address,
        })
        .json()

      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error modifying client'
        //console.log(error.value);
        return
      }
      onFetchFinally(() => {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Saved successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        return true
      })
    },
    async createClient(
      name: string,
      taxNumber: string,
      country_code: number,
      county: string,
      city: string,
      postal_code: string,
      address: string,
      phone: string,
      email: string,
    ) {
      const user = useUserStore()
      uiStore.isLoading = true
      const ccode = parseInt(country_code.toString())
      const { error, data } = await useFetch(API_URL + '/clients', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .post({
          name: name,
          phone: phone,
          email: email,
          tax: taxNumber,
          address: address,
          postcode: postal_code,
          city: city,
          country_id: ccode,
          county: county,
        })
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error creating client'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Created successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        this.getClients()
      }
    },
    async deleteClient(id: number) {
      const user = useUserStore()
      uiStore.isLoading = true
      const { error, data } = await useFetch(API_URL + '/clients/' + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .delete()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error deleting client'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Deleted successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        // this.listClients=data.value
      }
    },
    async getStaffByID(id: number) {
      const user = useUserStore()
      uiStore.isLoading = true
      const { error, data } = await useFetch(API_URL + '/staffs/' + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .get()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting staff'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        console.log(data.value)
        user.currentUserInfo = data.value[0]
        return
      }
    },
    async getStaffs() {
      const user = useUserStore()
      if (this.currentPage == 1) {
        this.listStaffs = []
      }

      uiStore.isLoading = true
      const { error, data } = await useFetch(
        API_URL +
          '/staffs?page=' +
          this.currentPage +
          '&name=' +
          this.searchKeyword,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .get()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting staffs'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        // if (data.value.length == 0) {
        //   uiStore.createNotification(
        //     "No staff found",
        //     "negative",
        //     "top",
        //     "drv-alert-triangle"
        //   );
        // }
        if (this.currentPage == 1) {
          if (data.value.length == 0) {
            this.listStaffs = []
            return true
          } else {
            console.log(data)
            this.listStaffs = data.value
            return false
          }
        } else {
          if (data.value.length == 0) {
            return true
          } else {
            //cicle through the data and add it to the list
            for (let i = 0; i < data.value.length; i++) {
              this.listStaffs.push(data.value[i])
            }
            return false
          }
        }

        //console.log(this.listClients, "this.listClients");
      }
      ////console.log(data,'data')
      //uiStore.isLoading=false
      // this.listClients.push(data.value)
      ////console.log(this.listClients)
    },
    async modifyStaff(
      id: number,
      name: string,
      email: string,
      phone: string,
      mobile: string,
    ) {
      const user = useUserStore()
      uiStore.isLoading = true
      const { error, data } = await useFetch(API_URL + '/staffs/' + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .patch({
          name: name,
          email: email,
          phone: phone,
          mobile: mobile,
        })
        .json()

      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error modifying staff'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return false
      } else {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Saved successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        return true
        // this.listStaffs=data.value
      }
    },
    async createStaff(
      name: string,
      email: string,
      phone: string,
      mobile: string,
      username: string,
    ) {
      const user = useUserStore()
      uiStore.isLoading = true
      const { error, data } = await useFetch(API_URL + '/staffs', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .post({
          name: name,
          email: email,
          phone: phone,
          mobile: mobile,
          username: username,
        })
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error creating staff'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return false
      } else {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Created successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        this.getStaffs()
        return true
        // this.listStaffs=data.value
      }
    },
    async deleteStaff(id: number) {
      const user = useUserStore()
      uiStore.isLoading = true

      const { error, data } = await useFetch(API_URL + '/staffs/' + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .delete()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error deleting staff'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return false
      } else {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Deleted successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        return true
        // this.listStaffs=data.value
      }
    },
    async changeStaffPassword(id: number, username: string) {
      const user = useUserStore()
      uiStore.isLoading = true
      const { error, data } = await useFetch(
        API_URL + '/staffs/' + id + '/change-password',
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .post({
          username: username,
          service: 'booking',
        })
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error changing password'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return false
      } else {
        uiStore.isLoading = false
        uiStore.createNotification(
          'Password changed successfully',
          'positive',
          'top',
          'drv-check-square-broken',
        )
        //console.log(data.value);
        return true
        // this.listStaffs=data.value
      }
    },
    sortUserFirst() {
      const user = useUserStore()
      //console.log(this.listStaffs, "service.listStaffs");
      //search for the user email in the payload and put it at the first position
      for (let i = 0; i < this.listStaffs.length; i++) {
        if (this.listStaffs[i].email.email == user.payload?.email) {
          this.listStaffs.unshift(this.listStaffs.splice(i, 1)[0])
          break
        }
      }
    },
    async searchLocations(location: string) {
      uiStore.isLoading = true
      const { error, data } = await useFetch(
        API_URL + '/locations?query=' + location,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .get()
        .json()
      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting locations'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        // uiStore.createNotification('Locations found','positive','top','drv-check-square-broken')
        //console.log(data.value);
        this.listLocations = data.value
      }
    },
    async quoteRequest(serviceType: number, clientID: number) {
      const user = useUserStore()
      uiStore.isLoading = true
      const quotes: Quotes = []

      quotes[0] = {
        quote_client_id: clientID || null,
        service_type: serviceType,
        segments: this.getSegments(serviceType),
        passengers: 1,
        lang: 'en',
      }
      const raw = JSON.stringify(quotes)

      const { error, data } = await useFetch(API_URL + '/quote-requests', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: raw,
      }).json()

      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting quote'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )

        user.quoteRes = []
        return false
      } else {
        uiStore.isLoading = false
        user.quoteRes = data.value['collection']
        return true
      }
    },

    getSegments(serviceType: number) {
      const segments: Segment[] = []
      const convertDate = this.convertDate(
        user.quoteRide.date_1,
        user.quoteRide.time_1,
      )

      if (serviceType == 1) {
        segments.push({
          name: user.quoteRide.pickup_1.name,
          type: user.quoteRide.pickup_1.type,
          lat: user.quoteRide.pickup_1.lat.toString(),
          lon: user.quoteRide.pickup_1.lon.toString(),
          date_time: convertDate,
          airport_code: user.quoteRide.pickup_1.iata
            ? user.quoteRide.pickup_1.iata
            : user.quoteRide.pickup_1.icao || '',
        })
        segments.push({
          name: user.quoteRide.dropoff_1.name,
          type: user.quoteRide.dropoff_1.type,
          lat: user.quoteRide.dropoff_1.lat.toString(),
          lon: user.quoteRide.dropoff_1.lon.toString(),
          date_time: convertDate,
          airport_code: user.quoteRide.dropoff_1.iata
            ? user.quoteRide.dropoff_1.iata
            : user.quoteRide.dropoff_1.icao || '',
        })
      } else if (serviceType == 2) {
        const convertDate2 = this.convertDate(
          user.quoteRide.date_1,
          user.quoteRide.time_2 || '',
        )

        segments.push({
          name: user.quoteRide.pickup_1.name,
          type: user.quoteRide.pickup_1.type,
          lat: user.quoteRide.pickup_1.lat.toString(),
          lon: user.quoteRide.pickup_1.lon.toString(),
          date_time: convertDate,
          airport_code: user.quoteRide.pickup_1.iata
            ? user.quoteRide.pickup_1.iata
            : user.quoteRide.pickup_1.icao || '',
        })
        segments.push({
          name: user.quoteRide.dropoff_1.name,
          type: user.quoteRide.dropoff_1.type,
          lat: user.quoteRide.dropoff_1.lat.toString(),
          lon: user.quoteRide.dropoff_1.lon.toString(),
          date_time: convertDate2,
          airport_code: user.quoteRide.dropoff_1.iata
            ? user.quoteRide.dropoff_1.iata
            : user.quoteRide.dropoff_1.icao || '',
        })
      }

      return segments
    },
    convertDate(date: string, time: string) {
      //convert date and time to iso format

      const dateTime = new Date(date + ' ' + time)
      const isoString = dateTime.toISOString()
      return isoString
    },

    temp() {
      const user = useUserStore()
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Accept', 'application/json')
      myHeaders.append('Authorization', `Bearer ${user.token}`)

      const raw = JSON.stringify([
        {
          quote_client_id: null,
          service_type: 1,
          segments: [
            {
              name: 'BCN LEBL Barcelona El Prat Airport',
              type: 2,
              lat: '41.297445',
              lon: '2.083294',
              date_time: '2024-11-24T13:00Z',
              airport_code: 'BCN',
            },
            {
              name: 'QSA Sabadell Airport',
              type: 2,
              lat: '41.5214',
              lon: '2.0998',
              date_time: '2024-11-24T14:00Z',
              airport_code: 'QSA',
            },
          ],
          passengers: 3,
          lang: 'en',
        },
      ])

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      fetch('https://preaws-bag.drivania.com/quote-requests', requestOptions)
        .then(response => response.text())
        .then(result => {
          const res = JSON.parse(result)
          //console.log(res,'res')
          if (res) {
            const quoteRes: Collection = res['collection']
            //console.log(quoteRes,'quoteRes')
          }
        })
        .catch(error => console.error(error))
    },
    async getFbos(code: string) {
      const { error, data } = await useFetch(
        API_URL + '/fbos?airport_code=' + code,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
        .get()
        .json()

      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error getting Fbos'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )

        user.quoteRes = []
        return false
      } else {
        uiStore.isLoading = false
        this.listFbos = data.value
        return true
      }
    },

    async saveQuote() {
      const quoteUser: QuoteUser = {
        bookingAgentId: 0,
        staffId: '',
        clientReference: '',
        confirm: false,
        invoice: {
          invoiceTo: '',
          agentId: 0,
          clientId: null,
          payment: {
            type: 0,
            creditCardId: '',
          },
        },
        services: [],
        ipClient: '',
        userAgent: '',
        salesPlatform: 0,
      }
      const user = useUserStore()

      quoteUser.bookingAgentId = user.payload?.cid || 0
      quoteUser.staffId = user.payload?.sid || ''
      quoteUser.clientReference = user.payload?.cna || '' //booking id
      quoteUser.confirm = false //book now confirm true save false
      quoteUser.invoice.invoiceTo = '' //invoice 1 o 2 se debe llamar otro endpoint
      quoteUser.invoice.agentId = user.payload?.cid || 0
      quoteUser.invoice.clientId = null
      quoteUser.invoice.payment.type = 0
      quoteUser.invoice.payment.creditCardId = user.payload?.cna || ''
      quoteUser.services[0].type = ''
      quoteUser.services[0].serviceDescription = 'One way'
      quoteUser.services[0].passenger.name = user.passengerDetails.fullName
      quoteUser.services[0].passenger.phone = user.passengerDetails.cellphone
      quoteUser.services[0].passenger.email = user.passengerDetails.email
      quoteUser.services[0].pax = user.passengerDetails.numTravelers
      quoteUser.services[0].flights.pickup = null //tailnumber o flightnumber
      quoteUser.services[0].flights.dropoff = null
      quoteUser.services[0].fbo = null
      quoteUser.services[0].comments = ''
      quoteUser.services[0].serviceID = ''
      quoteUser.services[0].vehicleID = ''

      const { error, data } = await useFetch(API_URL + '/services', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .post(quoteUser)
        .json()

      if (error.value) {
        uiStore.isError = true
        uiStore.isLoading = false
        uiStore.errorMessage = 'Error saving quote'
        uiStore.createNotification(
          uiStore.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //console.log(error.value);
        return
      } else {
        uiStore.isLoading = false
        console.log(data.value)
        return true
      }
    },
  },
})

/* 
[{"quote_client_id":null,"service_type":1,"segments":[{"name":"BCN LEBL Barcelona El Prat Airport","type":2,"lat":"41.297445","lon":"2.083294","date_time":"2024-11-24T13:00Z","airport_code":"BCN"},{"name":"QSA Sabadell Airport","type":2,"lat":"41.5214","lon":"2.0998","date_time":"2024-11-24T14:00Z","airport_code":"QSA"}],"passengers":3,"lang":"en"}] 
*/
