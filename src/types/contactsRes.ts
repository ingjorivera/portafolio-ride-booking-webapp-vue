export interface ContactsRes {
  role_id: string
  role_name: string
  name: string
  email: string
  phone: string
  recipient: string
  actions: Action[]
  id: string
  client_id: number | null
  per_service: boolean
}

export interface Action {
  pattern: string
  name: string
  email: boolean
  sms: boolean
}
