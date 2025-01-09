export interface QuoteUser {
  bookingAgentId: number
  staffId: string
  clientReference: string
  confirm: boolean
  invoice: Invoice
  services: Service[]
  ipClient: string
  userAgent: string
  salesPlatform: number
}

interface Service {
  type: string
  serviceDescription: string
  passenger: Passenger
  pax: number
  flights: Flights
  fbo: null
  comments: string
  serviceID: string
  vehicleID: string
}

interface Flights {
  pickup: null
  dropoff: null
}

interface Passenger {
  name: string
  phone: string
  email: string
}

interface Invoice {
  invoiceTo: string
  agentId: number
  clientId: null
  payment: Payment
}

interface Payment {
  type: number
  creditCardId: string
}
