import type { Vehicle } from './../types/quotesResult'
import { defineStore } from 'pinia'
import type { Staffs } from './../types/clients'
import { ref } from 'vue'
import type { ride } from '../types/rides'
import type { Collection } from '../types/quotesResult'
import type { Profiles } from '../types/profiles'
import type { Payload } from '../types/jwt'
import type { QuoteUser } from '../types/quoteUser'
import type {
  PassengersNotifications,
  typeOfNotification,
} from '@/types/passengersNotifications'

export const useUserStore = defineStore('user', {
  state: () => ({
    listStaffs: ref<Staffs>([]),
    listLogin: ref<any[]>([]),
    userStaff: '',
    user: ref(''),
    userInfo: ref<Profiles>({
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
    currentUserInfo: ref<Profiles>({
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
    quoteRide: ref<ride>({
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
    quoteRes: ref<Collection>([]),
    selectedCars: ref<Vehicle[]>([]),
    token: '',
    payload: ref<Payload | null>(null),
    userFlights: ref({
      arrivalFlight: {
        flightNumber: '',
        tailNumber: '',
        fboId: '',
        crewMembers: false,
      },
      departureFlight: {
        flightNumber: '',
        tailNumber: '',
        fboId: '',
        crewMembers: false,
      },
    }),
    passengerDetails: ref<any>({
      fullName: '',
      email: '',
      countryCode: '',
      cellphone: '',
      numTravelers: 0,
      babySeats: 0,
      childBoosters: 0,
    }),
    quoteUser: ref<QuoteUser>({
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
    }),
    passengersNotifications: ref<PassengersNotifications[]>([
      {
        name: '',
        email: '',
        leadPassenger: false,
        onRoute: {
          etaAtDropOff: {
            sms: false,
            email: false,
          },
          passengerDroppedOff: {
            sms: false,
            email: false,
          },
          passengerOnBoard: {
            sms: false,
            email: false,
          },
        },
        phone: '',
        preBoarding: {
          chauffeurContactDetails: {
            sms: false,
            email: false,
          },
          chauffeurOnLocation: {
            sms: false,
            email: false,
          },
          chauffeurOnTheWay: {
            sms: false,
            email: false,
          },
        },
      },
    ]),
  }),
  actions: {
    addListLogin() {
      this.listLogin = [
        {
          label: 'Add user profile',
          value: 'add_profile',
          icon: 'fas drv-plus',
        },
        ...this.listStaffs.map(staff => ({
          label: staff.name,
          value: staff.id,
          icon: '',
        })),
      ]
    },
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
      this.quoteRes = []
    },
    addCar(car: Vehicle) {
      this.selectedCars.push(car)
    },
    removeCar(car: Vehicle) {
      this.selectedCars = this.selectedCars.filter(
        c => c.vehicleId != car.vehicleId,
      )
    },
    addPassengerNotification(passenger: PassengersNotifications) {
      this.passengersNotifications.push(passenger)
    },
  },
})
