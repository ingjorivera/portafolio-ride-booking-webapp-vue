export interface BookService {
  salesPlatform: number
  bookingAgentId: string
  staffId: string
  confirm: boolean
  add_every_service_contacts: boolean
  clientReference: string
  ipClient: string
  userAgent: string
  invoice: Invoice
  services: Service[]
}

export interface Service {
  type: string
  service_subtype: string
  serviceID: string
  vehicleID: string
  pax: number
  passenger: Passenger
  fbo: Fbo
  brokerCommission: null
  fbo_code: null
  internal_additional_info: null
  comments: string
  flights: Flights
  childseats: number
  boosters: number
  crew_member: boolean
  contacts: Contact[]
  purchase_order: string
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

export type PermissionDetail = {
  sms: boolean
  email: boolean
}

export type Permissions = {
  [key: string]: {
    [permissionName: string]: PermissionDetail
  }
}

interface Flights {
  pickup: string
  dropoff: null
}

interface Fbo {
  pickup: Pickup
  dropoff: null
}

interface Pickup {
  id: number
  name: string
  phone: string
  iata: null
}

interface Passenger {
  id: null
  name: string
  phone: string
  email: string
}

interface Invoice {
  invoiceTo: number
  clientId: null
  agentId: string
  payment: Payment
}

interface Payment {
  type: number
  creditCardId: string
}
