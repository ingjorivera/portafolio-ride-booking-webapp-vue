export interface Countries {
  id: number
  name: string
  code: string
  shortCode: string
  phoneCode: '' | string
  ue: boolean
}

export interface CountriesResponse {
  countries: Countries[]
}
