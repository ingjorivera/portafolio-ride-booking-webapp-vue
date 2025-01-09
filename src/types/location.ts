export interface LocationsRes {
  locations: RideLocation[]
}

export interface Location {
  lat: number
  lon: number
  name: string
  type: number
  iata?: string
  icao?: string
}

export interface RideLocation {
  pickup_1: Location
  dropoff_1: Location
  date_1: string
  time_1: string
  type: string
  pickup_2: Location
  dropoff_2: Location
  date_2: string
  time_2: string
}
