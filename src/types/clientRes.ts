export interface ClientByID {
  id: number
  agent_id: number
  type: Type
  status: Type
  branch: Branch
  invoice_my_company: boolean
  invoice_someone_else: boolean
  default_invoice_to: string
  show_credit_card_history: boolean
  broker: boolean
  payment_method: Type
  allow_autoinvoice: boolean
  broken_defaul_comision: number
  currency: Currency
  allow_request_with_client_conditions: boolean
  head_office: Headoffice
}

export interface Headoffice {}

export interface Branch {
  id: number
  name: string
  country: Country
  email: Email
  vat: string
  currency: Currency
}

export interface Currency {
  id: number
  name: string
  code: string
  symbol: string
  ue: boolean
}

export interface Email {
  email: string
  emails: string[]
}

export interface Country {
  id: number
  name: string
  code: string
  branch_id: number
  branch_bizav_id: number
  ue: boolean
  regime: string
}

export interface Type {
  id: number
  name: string
}
