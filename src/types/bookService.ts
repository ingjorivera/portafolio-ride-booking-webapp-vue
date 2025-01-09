export interface BookService {
  salesPlatform: number
  bookingAgentId: number
  itineraryReference: string | null
  staffId: string | null
  confirm: boolean
  add_every_service_contacts: boolean
  clientReference: string
  brokerCommission: number
  ipClient?: string
  userAgent?: string

  invoice: Invoice
  services: Service[]
}

export interface Service {
  passenger: Passenger
  type: string
  pax: number
  flights?: Flights | null
  fbo?: Fbo | null
  comments: string
  serviceID: string
  vehicleID: string
  serviceDescription: string
  childseats: number
  crew_member: boolean
  arrival_flight_type: string
  departure_flight_type: string
  boosters: number
  contacts?: Contact[] | null
  purchase_order: string
  internal_additional_info: string | null
}

export interface Fbo {
  pickup?: Pickup
  dropoff?: Pickup
}

export interface Pickup {
  id: string | null
  name: string
  phone: string
  iata: string | null
}

export interface Flights {
  pickup?: string
  dropoff?: string
}

export interface Passenger {
  id?: number | null
  phone: string
  email: string
  name: string
}

export interface Invoice {
  invoiceTo: string
  clientId: number | null
  agentId: number
  payment: Payment
  client: Client
}

export interface Client {
  name: string
  address: string
  phone: number
  email: string
  vatId: string
  city: string
  postcode: string
  county: string
  country: string
  simplifiedInvoice: boolean
}

export interface Payment {
  type: number
  creditCardId: string
}

export interface Contact {
  roleId: string
  name: string
  email: string
  phone: string
  recipient: string
  position: string
  permissions: Permissions
}

export interface BookingConfirmation {
  email: boolean
  sms: boolean
}

export interface Permissions {
  BookingConfirmation: BookingConfirmation
  BookingQuotation: BookingConfirmation
  DriverOnLocation: BookingConfirmation
  PassengerOnBoard: BookingConfirmation
  DropOff: BookingConfirmation
}
