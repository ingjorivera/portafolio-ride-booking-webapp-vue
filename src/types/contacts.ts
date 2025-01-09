export interface passengerItem {
  phone: any
  name: string
}

export interface paymentItem {
  creditCardId: string
  type: number
}

export interface invoiceItem {
  agentId: number
  clientId: any
  client: any
  invoiceTo: number
  payment: paymentItem
}

export interface servicesItem {
  fbo: string
  comments: string
  passenger: passengerItem
  pax: number
  serviceDescription: string
  vehicleID: string
  type: number
  flights: string
  serviceID: string
  contacts: Array<contactsItem>
}

export interface contactsItem {
  roleId: string
  recipient: string
  position: string
  passenger_name: string
  email: string
}

export interface rootType {
  confirm: boolean
  bookingAgentId: number
  userAgent: string
  invoice: invoiceItem
  services: Array<servicesItem>
  staffId: any
  ipClient: string
}
