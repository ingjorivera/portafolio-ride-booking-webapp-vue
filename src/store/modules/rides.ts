import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Quotes, Segment } from '../../types/rides'
import type { Collection } from '../../types/quotesResult'
import type { Vehicle } from '../../types/quotesResult'

import type { RideLocation, LocationsRes } from '../../types/location'
import { useUiStore } from '../ui'
import { useAuthStore } from './auth'
import type { BookService, Fbo, Flights } from '../../types/bookService'
import type { PassengersNotifications } from '@/types/passengersNotifications'
import type { Action, ContactsRes } from '@/types/contactsRes'
import { useClientsStore } from '@/store'
import type { Service } from '@/types/bs'

const env = import.meta.env
const API_URL = `${env.VITE_BASE_URL ?? 'https://preaws-bag.drivania.com'}`

export const useRidesStore = defineStore('rides', {
  state: () => ({
    bookService: ref<BookService>({
      salesPlatform: 0,
      add_every_service_contacts: false,
      bookingAgentId: 0,

      itineraryReference: '',
      staffId: '',
      confirm: false,
      clientReference: '',
      brokerCommission: 0,
      ipClient: '',
      userAgent: '',
      invoice: {
        invoiceTo: '',
        clientId: 0,
        agentId: 0,
        payment: {
          type: 0,
          creditCardId: '',
        },
        client: {
          name: '',
          address: '',
          phone: 0,
          email: '',
          vatId: '',
          city: '',
          postcode: '',
          county: '',
          country: '',
          simplifiedInvoice: false,
        },
      },
      services: [
        {
          contacts: [],
          purchase_order: '',
          internal_additional_info: null,
          passenger: {
            id: 0,
            phone: '',
            email: '',
            name: '',
          },
          type: '',
          pax: 0,
          flights: {},
          fbo: {},
          comments: '',
          serviceID: '',
          vehicleID: '',
          serviceDescription: '',
          childseats: 0,
          crew_member: false,
          arrival_flight_type: '',
          departure_flight_type: '',
          boosters: 0,
        },
      ],
    }),
    quoteRide: ref<RideLocation>({
      pickup_1: { lat: 0, lon: 0, name: '', type: 0 },
      dropoff_1: { lat: 0, lon: 0, name: '', type: 0 },
      date_1: '',
      time_1: '',
      type: 'singleride',
      pickup_2: { lat: 0, lon: 0, name: '', type: 0 },
      dropoff_2: { lat: 0, lon: 0, name: '', type: 0 },
      date_2: '',
      time_2: '',
    }),
    quoteResults: ref<Collection>([]),
    selectedVehicles: ref<Vehicle[]>([]),
    listFbos: ref([]),
    listLocations: ref<LocationsRes[]>([]),
    passengerDetails: ref({
      fullName: '',
      email: '',
      countryCode: '',
      cellphone: '',
      numTravelers: 0,
      babySeats: 0,
      childBoosters: 0,
      aditional: '',
      id: 0,
    }),
    flightInfo: ref({
      crewMembers: false,
      arrival: {
        flightNumber: '',
        tailNumber: '',
        fbo: {
          fbo_id: '',
          fbo_name: '',
        },
      },
      departure: {
        flightNumber: '',
        tailNumber: '',
        fbo: {
          fbo_id: '',
          fbo_name: '',
        },
      },
    }),
    mySettings: ref({
      bookingID: '',
      managementFee: 0,
    }),
    passengersNotifications: ref<ContactsRes[]>([]),
    services: ref<Service[]>([]),
  }),

  actions: {
    resetQuote() {
      this.quoteRide = {
        pickup_1: { lat: 0, lon: 0, name: '', type: 0 },
        dropoff_1: { lat: 0, lon: 0, name: '', type: 0 },
        date_1: '',
        time_1: '',
        type: 'singleride',
        pickup_2: { lat: 0, lon: 0, name: '', type: 0 },
        dropoff_2: { lat: 0, lon: 0, name: '', type: 0 },
        date_2: '',
        time_2: '',
      }
    },

    refreshQuotes() {
      this.quoteResults = []
    },

    addVehicle(vehicle: Vehicle) {
      this.selectedVehicles.push(vehicle)
    },

    removeVehicle(vehicle: Vehicle) {
      this.selectedVehicles = this.selectedVehicles.filter(
        v => v.vehicleId !== vehicle.vehicleId,
      )
    },
    addPassengerNotification(passenger: ContactsRes) {
      this.passengersNotifications.push(passenger)
    },
    removePassengerNotification(index: number) {
      this.passengersNotifications.splice(index, 1)
    },

    async searchLocations(query: string, lat: number, lon: number) {
      const ui = useUiStore()
      const auth = useAuthStore()
      let latlon = ''
      ui.isLoading = true

      try {
        if (lat != 0 || lon != 0) {
          latlon = '&lat=' + lat + '&lon=' + lon
        }
        const response = await fetch(
          `${API_URL}/locations?query=${query}${latlon}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok) throw new Error('Error searching locations')

        this.listLocations = data.locations
        return
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting locations'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        this.listLocations = []
        return
      } finally {
        ui.isLoading = false
      }
    },

    async getFbos(airportCode: string) {
      const ui = useUiStore()
      const auth = useAuthStore()

      try {
        const response = await fetch(
          `${API_URL}/fbos?airport_code=${airportCode}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok) throw new Error('Error fetching FBOs')

        this.listFbos = data
        return true
      } catch (error) {
        ui.isError = true
        ui.errorMessage = 'Error getting FBOs'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        return false
      }
    },

    async requestQuote(serviceType: number, clientId: number) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const quotes: Quotes = [
          {
            quote_client_id: clientId || null,
            service_type: serviceType,
            segments: this.getSegments(serviceType),
            passengers: 1,
            lang: 'en',
          },
        ]

        const response = await fetch(`${API_URL}/quote-requests`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quotes),
        })

        const data = await response.json()

        if (!response.ok) throw new Error('Error requesting quote')

        this.quoteResults = data.collection

        return true
      } catch (error) {
        console.log(error, 'error----')
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting quote'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        this.quoteResults = []
        return false
      } finally {
        ui.isLoading = false
      }
    },

    getSegments(serviceType: number): Segment[] {
      const segments: Segment[] = []
      const convertDate = this.convertDate(
        this.quoteRide.date_1,
        this.quoteRide.time_1,
      )

      if (serviceType === 1) {
        segments.push({
          name: this.quoteRide.pickup_1.name,
          type: this.quoteRide.pickup_1.type,
          lat: this.quoteRide.pickup_1.lat.toString(),
          lon: this.quoteRide.pickup_1.lon.toString(),
          date_time: convertDate,
          airport_code:
            this.quoteRide.pickup_1.iata || this.quoteRide.pickup_1.icao || '',
        })
        segments.push({
          name: this.quoteRide.dropoff_1.name,
          type: this.quoteRide.dropoff_1.type,
          lat: this.quoteRide.dropoff_1.lat.toString(),
          lon: this.quoteRide.dropoff_1.lon.toString(),
          date_time: convertDate,
          airport_code:
            this.quoteRide.dropoff_1.iata ||
            this.quoteRide.dropoff_1.icao ||
            '',
        })
      } else if (serviceType === 2) {
        const convertDate2 = this.convertDate(
          this.quoteRide.date_1,
          this.quoteRide.time_2 || '',
        )

        segments.push({
          name: this.quoteRide.pickup_1.name,
          type: this.quoteRide.pickup_1.type,
          lat: this.quoteRide.pickup_1.lat.toString(),
          lon: this.quoteRide.pickup_1.lon.toString(),
          date_time: convertDate,
          airport_code:
            this.quoteRide.pickup_1.iata || this.quoteRide.pickup_1.icao || '',
        })
        segments.push({
          name: this.quoteRide.dropoff_1.name,
          type: this.quoteRide.dropoff_1.type,
          lat: this.quoteRide.dropoff_1.lat.toString(),
          lon: this.quoteRide.dropoff_1.lon.toString(),
          date_time: convertDate2,
          airport_code:
            this.quoteRide.dropoff_1.iata ||
            this.quoteRide.dropoff_1.icao ||
            '',
        })
      }

      return segments
    },

    convertDate(date: string, time: string): string {
      // Validar que tengamos fecha y hora
      if (!date || !time) {
        console.error('Fecha u hora faltante:', { date, time })
        return new Date().toISOString()
      }

      try {
        // Convertir formato de fecha YYYY/MM/DD a YYYY-MM-DD
        const [year, month, day] = date.split('/')
        const [hourMin, period] = time.split(' ') // "HH:MM AM/PM"
        const [hours, minutes] = hourMin.split(':')

        // Convertir a formato 24 horas
        let hour = parseInt(hours)
        if (period?.toUpperCase() === 'PM' && hour < 12) {
          hour += 12
        } else if (period?.toUpperCase() === 'AM' && hour === 12) {
          hour = 0
        }

        // Crear fecha en UTC
        const dateTime = new Date(
          Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            hour,
            parseInt(minutes),
          ),
        )

        return dateTime.toISOString()
      } catch (error) {
        console.error('Error al convertir fecha:', error, { date, time })
        return new Date().toISOString()
      }
    },
    convertToTimeWithAmPmFromISO(date: string) {
      const dateSel = new Date(date)
      const hours = dateSel.getHours()
      const minutes = dateSel.getMinutes()
      let min = ''
      if (minutes < 10) {
        min = '0'
      }
      let timeStr = ''
      if (hours < 12) {
        timeStr = `${hours}:${min}${minutes} AM`
      } else {
        timeStr = `${hours - 12}:${min}${minutes} PM`
      }
      return timeStr
    },
    resetRides() {
      this.quoteRide = {
        pickup_1: { lat: 0, lon: 0, name: '', type: 0 },
        dropoff_1: { lat: 0, lon: 0, name: '', type: 0 },
        date_1: '',
        time_1: '',
        type: 'singleride',
        pickup_2: { lat: 0, lon: 0, name: '', type: 0 },
        dropoff_2: { lat: 0, lon: 0, name: '', type: 0 },
        date_2: '',
        time_2: '',
      }
      this.quoteResults = []
      this.selectedVehicles = []
      this.listFbos = []
      this.listLocations = []
      this.passengerDetails = {
        aditional: '',
        fullName: '',
        email: '',
        countryCode: '',
        cellphone: '',
        numTravelers: 0,
        babySeats: 0,
        childBoosters: 0,
        id: 0,
      }
    },
    async getLocationInfo(gReference: string) {
      const ui = useUiStore()
      const auth = useAuthStore()

      ui.isLoading = true

      try {
        const response = await fetch(`${API_URL}/location/${gReference}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const data = await response.json()

        if (!response.ok)
          throw new Error('Error getting location with gReference')

        //this.listLocations = data.locations
        console.log(data, 'data----------')
        return data
      } catch (error) {
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error getting location with gReference'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        this.listLocations = []
        return
      } finally {
        ui.isLoading = false
      }
    },
    searchAlert(searchName: string, actions: Action[]) {
      const alert = actions.find(item => item.name === searchName)
      return alert
        ? { email: alert.email, sms: alert.sms }
        : { email: false, sms: false }
    },
    convertContacts() {
      if (this.passengersNotifications.length === 0) return null
      else {
        return this.passengersNotifications.map(passenger => {
          const permissions = {
            BookingConfirmation: {
              email: this.searchAlert(
                'BookingChauffeurDetail',
                passenger.actions,
              ).email,
              sms: this.searchAlert('BookingChauffeurDetail', passenger.actions)
                .sms,
            },
            BookingQuotation: {
              email: this.searchAlert('BookingQuotation', passenger.actions)
                .email,
              sms: this.searchAlert('BookingQuotation', passenger.actions).sms,
            },
            DriverOnLocation: {
              email: this.searchAlert('DriverOnLocation', passenger.actions)
                .email,
              sms: this.searchAlert('DriverOnLocation', passenger.actions).sms,
            },
            PassengerOnBoard: {
              email: this.searchAlert('PassengerOnBoard', passenger.actions)
                .email,
              sms: this.searchAlert('PassengerOnBoard', passenger.actions).sms,
            },
            DropOff: {
              email: this.searchAlert('DropOff', passenger.actions).email,
              sms: this.searchAlert('DropOff', passenger.actions).sms,
            },
          }

          return {
            roleId: passenger.role_id,
            name: passenger.name,
            email: passenger.email,
            phone: passenger.phone,
            recipient: passenger.name,
            position: passenger.role_name,
            permissions,
          }
        })
      }
    },

    async saveQuote() {
      const clientsStore = useClientsStore()
      const ui = useUiStore()
      const authStore = useAuthStore()

      const fbos: Fbo = {}
      const flights: Flights = {}

      /*aqui va la info de bookservice
       */

      this.bookService = {
        salesPlatform: 8,
        add_every_service_contacts: false,
        bookingAgentId: authStore.payload?.cid || 0,
        itineraryReference: null,
        staffId: '' + authStore.payload?.sid || '',
        confirm: false,
        clientReference: this.mySettings.bookingID || '',
        brokerCommission: +this.mySettings.managementFee,
        ipClient: '',
        userAgent: '',

        invoice: {
          invoiceTo: '1',
          clientId: clientsStore.selectedClient?.id || 0,
          agentId: authStore.payload?.cid || 0,
          payment: {
            type: clientsStore.currentClientInfo?.payment_method.id || 0,
            creditCardId: '',
          },
          client: {
            name: clientsStore.selectedClient?.name || '',
            address: clientsStore.selectedClient?.address || '',
            phone: +(clientsStore.selectedClient?.phone || 0),
            email: clientsStore.selectedClient?.email || '',
            vatId: clientsStore.selectedClient?.tax || '',
            city: clientsStore.selectedClient?.city || '',
            postcode: clientsStore.selectedClient?.postcode || '',
            county: clientsStore.selectedClient?.county || '',
            country: clientsStore.selectedClient?.country || '',
            simplifiedInvoice: false,
          },
        },
        services: [],
      }

      if (
        this.quoteRide.dropoff_1.iata != '' ||
        this.quoteRide.pickup_1.icao != ''
      ) {
        fbos.pickup = {
          id: this.quoteRide.dropoff_1.iata || null,
          name: this.quoteRide.dropoff_1.name,
          phone: '',
          iata: this.quoteRide.dropoff_1.iata || null,
        }
      }
      if (
        this.quoteRide.pickup_1.icao != '' ||
        this.quoteRide.dropoff_1.iata != ''
      ) {
        fbos.pickup = {
          id: this.quoteRide.pickup_1.iata || null,
          name: this.quoteRide.pickup_1.name,
          phone: '',
          iata: this.quoteRide.pickup_1.iata || null,
        }
      }

      if (
        this.flightInfo.departure.flightNumber != '' ||
        this.flightInfo.departure.tailNumber != ''
      ) {
        flights.pickup =
          this.flightInfo.departure.flightNumber != ''
            ? this.flightInfo.departure.flightNumber
            : this.flightInfo.departure.tailNumber
      }
      if (
        this.flightInfo.arrival.flightNumber != '' ||
        this.flightInfo.arrival.tailNumber != ''
      ) {
        flights.dropoff =
          this.flightInfo.arrival.flightNumber != ''
            ? this.flightInfo.arrival.flightNumber
            : this.flightInfo.arrival.tailNumber
      }

      for (const vehicle of this.selectedVehicles) {
        this.bookService.services.push({
          arrival_flight_type: '', //pendiente
          purchase_order: '',
          internal_additional_info: null,
          contacts: this.convertContacts(),
          boosters: this.passengerDetails.childBoosters,
          childseats: this.passengerDetails.babySeats,
          comments: this.passengerDetails.aditional,
          crew_member: this.flightInfo.crewMembers,
          departure_flight_type: '', //pendiente
          fbo: Object.keys(fbos).length === 0 ? null : fbos,
          flights: Object.keys(flights).length === 0 ? null : flights,
          pax: this.passengerDetails.numTravelers,
          passenger: {
            email: this.passengerDetails.email,

            phone: this.passengerDetails.cellphone,
            name: this.passengerDetails.fullName,
          },
          serviceDescription: '',
          serviceID: this.quoteResults[0].serviceId,
          type: '',
          vehicleID: vehicle.vehicleId,
        })
      }
      ui.isLoading = true
      // this.bookService.services = []
      // this.bookService.salesPlatform = 8
      // this.bookService.itineraryReference = null
      // this.bookService.staffId = '' + auth.payload?.sid || null
      // this.bookService.brokerCommission = +this.mySettings.managementFee
      // this.bookService.bookingAgentId = auth.payload?.cid || 0
      // this.bookService.clientReference = this.mySettings.bookingID
      // this.bookService.confirm = false
      // this.bookService.invoice.invoiceTo = 2 + ''
      // this.bookService.invoice.agentId = auth.payload?.cid || 0
      // //this.bookService.invoice.invoiceTo = 1
      // //check fbos
      // const fbos: Fbo = {} //no enviar nada

      // if (
      //   this.quoteRide.dropoff_1.iata != '' ||
      //   this.quoteRide.pickup_1.icao != ''
      // ) {
      //   fbos.pickup = {
      //     id: this.quoteRide.dropoff_1.iata || null,
      //     name: this.quoteRide.dropoff_1.name,
      //     phone: '',
      //     iata: this.quoteRide.dropoff_1.iata || null,
      //   }
      // }
      // if (
      //   this.quoteRide.pickup_1.icao != '' ||
      //   this.quoteRide.dropoff_1.iata != ''
      // ) {
      //   fbos.pickup = {
      //     id: this.quoteRide.pickup_1.iata || null,
      //     name: this.quoteRide.pickup_1.name,
      //     phone: '',
      //     iata: this.quoteRide.pickup_1.iata || null,
      //   }
      // }

      // const flights: Flights = {}
      // if (
      //   this.flightInfo.departure.flightNumber != '' ||
      //   this.flightInfo.departure.tailNumber != ''
      // ) {
      //   flights.pickup =
      //     this.flightInfo.departure.flightNumber != ''
      //       ? this.flightInfo.departure.flightNumber
      //       : this.flightInfo.departure.tailNumber
      // }
      // if (
      //   this.flightInfo.arrival.flightNumber != '' ||
      //   this.flightInfo.arrival.tailNumber != ''
      // ) {
      //   flights.dropoff =
      //     this.flightInfo.arrival.flightNumber != ''
      //       ? this.flightInfo.arrival.flightNumber
      //       : this.flightInfo.arrival.tailNumber
      // }

      try {
        console.log(this.bookService, 'bookService')
        const response = await fetch(`${API_URL}/services`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.bookService),
        })

        const data = await response.json()
        console.log(data, 'data')
        if (!response.ok) throw new Error('Error saving quote')

        // this.quoteResults = data.collection

        return true
      } catch (error) {
        console.log(error, 'error')
        ui.isError = true
        ui.isLoading = false
        ui.errorMessage = 'Error saving quote'
        ui.createNotification(
          ui.errorMessage,
          'negative',
          'top',
          'drv-alert-triangle',
        )
        //this.quoteResults = []
        return false
      } finally {
        ui.isLoading = false
      }
    },
  },
})
