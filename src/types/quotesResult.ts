interface QuoteBySegment {
  clientId: number
  createdAt: string
  expiration: string
  message: '' | null
  requestType: '' | null
  segments: Segment[]
  serviceId: string
  serviceInfo: ServiceInfo
  serviceSubtype: string
  serviceTypeId: number
  targetClientId: '' | null
  vehicles: Vehicle[]
}

export interface Vehicle {
  cancellationPolicy: CancellationPolicy[]
  image: string
  pickupInstructions: string
  serviceFeatures: ServiceFeatures
  totalSalesPrice: number
  vehicle: VehicleDetails
  vehicleExamples: string
  vehicleId: string
  sale_currency?: string
}

export interface VehicleDetails {
  level_of_service: Levelofservice
  pax: number
  suitcase: number
  vehicle_class: Levelofservice
  vehicle_image_url: string
}

export interface Levelofservice {
  name: string
}

export interface ServiceFeatures {
  driver_details: Driverdetails
  service_alerts: Servicealerts
  vehicle_details: Driverdetails
  vehicle_geolocation: Servicealerts
}

interface Servicealerts {
  type: string
  value: string
}

interface Driverdetails {
  magnitude: string
  operator: string
  value: number
}

export interface CancellationPolicy {
  fee_percent: number
  max_minutes?: number
  min_minutes: number
}

interface ServiceInfo {
  kilometers: number
  minutes: number
}

interface Segment {
  airport_code: string
  date: string
  iso_datetime: string
  latitude: number
  longitude: number
  name: string
  type: number
}

export type Collection = QuoteBySegment[]
