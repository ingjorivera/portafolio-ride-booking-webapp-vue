export interface bookService_ {
  bookingAgentId: number
  staffId: null
  confirm: boolean
  invoice: Invoice
  services: Service[]
  ipClient: string
  userAgent: string
}

export interface Service {
  type: number
  serviceDescription: string
  passenger: Passenger
  pax: number
  flights: string
  fbo: string
  comments: string
  serviceID: string
  vehicleID: string
  contacts: Contact[]
}

export interface Contact {
  roleId: string
  passenger_name: string
  email?: string
  recipient: string
  position: string
  phone?: string
  permissions?: Permissions
}

export interface Permissions {
  BookingConfirmation: BookingConfirmation
  BookingQuotation: BookingConfirmation
  DriverOnLocation: BookingConfirmation
  PassengerOnBoard: BookingConfirmation
  DropOff: BookingConfirmation
}

export interface BookingConfirmation {
  email: boolean
  sms: boolean
}

export interface Passenger {
  name: string
  phone: null
}

export interface Invoice {
  invoiceTo: number
  agentId: number
  clientId: null
  client: null
  payment: Payment
}

export interface Payment {
  type: number
  creditCardId: string
}
