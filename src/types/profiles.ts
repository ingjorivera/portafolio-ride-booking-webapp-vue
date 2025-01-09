export interface Profiles {
  id: number
  name: string
  email: Email
  client_id: number
  status: Status
  phone: string
  mobile: string
  username: string
  language_id: number
  deleted_at: null
  user_administrator: boolean
  login_name: string
}

export interface Email {
  email: string
  emails: string[]
}

export interface Status {
  id: number
  name: string
}
