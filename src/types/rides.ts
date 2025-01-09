export type ride = {
  pickup_1: Location
  dropoff_1: Location
  date_1: string
  time_1: string
  type: 'singleride' | 'roundtrip'
  pickup_2?: Location
  dropoff_2?: Location
  date_2?: string
  time_2?: string
}
export type Location = {
  lat: number
  lon: number
  name: string
  type: number
  gReference?: string
  iata?: string //dejar solo este
  icao?: string
}

//types:
//1 - Transfer o single ride o oneway
//2 - Hourly

export interface Quote {
  quote_client_id: number | null
  service_type: number
  segments: Segment[]
  passengers: number
  lang: string
}

export interface Segment {
  name: string
  type: number
  lat: number | string
  lon: number | string
  date_time: string
  airport_code: null | string
}

export type Quotes = Quote[]
