<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

interface LatLng {
  lat: number
  lng: number
}

const props = defineProps({
  origin: {
    type: Object as () => LatLng,
    required: true,
    validator: (value: LatLng) => {
      return (
        typeof value.lat === 'number' &&
        typeof value.lng === 'number' &&
        value.lat >= -90 &&
        value.lat <= 90 &&
        value.lng >= -180 &&
        value.lng <= 180
      )
    }
  },
  destination: {
    type: Object as () => LatLng,
    required: true,
    validator: (value: LatLng) => {
      return (
        typeof value.lat === 'number' &&
        typeof value.lng === 'number' &&
        value.lat >= -90 &&
        value.lat <= 90 &&
        value.lng >= -180 &&
        value.lng <= 180
      )
    }
  },
  travelMode: {
    type: String,
    default: 'DRIVING',
    validator: (value: string) => {
      return ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'].includes(value)
    }
  }
})

const emit = defineEmits(['route-calculated', 'error'])

const mapContainer = ref<HTMLElement | null>(null)
const map = ref<google.maps.Map | null>(null)
const directionsService = ref<google.maps.DirectionsService | null>(null)
const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const mapStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f6efe2'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 50
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        lightness: -5
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  }
]

const createGoogleMapsOriginDestination = () => {
  // Convertir las coordenadas a objetos LatLng de Google Maps
  const originLatLng = new google.maps.LatLng(props.origin.lat, props.origin.lng)
  const destinationLatLng = new google.maps.LatLng(props.destination.lat, props.destination.lng)
  return { originLatLng, destinationLatLng }
}

// Inicializar el mapa
const initMap = async () => {
  try {
    error.value = null
    isLoading.value = true

    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    })

    await loader.load()

    if (!mapContainer.value) {
      throw new Error('El contenedor del mapa no está disponible')
    }

    // Crear el mapa centrado en el punto de origen
    const { originLatLng } = createGoogleMapsOriginDestination()

    map.value = new google.maps.Map(mapContainer.value, {
      center: originLatLng,
      zoom: 12,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      styles: mapStyles,
      disableDefaultUI: true
    })

    // Inicializar los servicios de direcciones
    directionsService.value = new google.maps.DirectionsService()
    directionsRenderer.value = new google.maps.DirectionsRenderer({
      map: map.value,
      suppressMarkers: false,
      preserveViewport: false,
      polylineOptions: {
        strokeColor: '#000000',
        strokeWeight: 4
      },
      markerOptions: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#000000',
          fillOpacity: 1,
          strokeColor: '#000000',
          strokeWeight: 1,
          scale: 7
        },
        label: null
      }
    })

    // Calcular la ruta inicial
    await calculateRoute()
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Error al cargar el mapa'
    error.value = errorMessage
    emit('error', errorMessage)
    console.error('Error en initMap:', e)
  } finally {
    isLoading.value = false
  }
}

// Calcular la ruta
const calculateRoute = async () => {
  try {
    if (!directionsService.value || !directionsRenderer.value) {
      throw new Error('Los servicios de dirección no están inicializados')
    }

    error.value = null

    const { originLatLng, destinationLatLng } = createGoogleMapsOriginDestination()

    const request: google.maps.DirectionsRequest = {
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: google.maps.TravelMode[props.travelMode as keyof typeof google.maps.TravelMode],
      optimizeWaypoints: true,
      provideRouteAlternatives: true,
      avoidHighways: false,
      avoidTolls: false
    }

    // Usar Promise para manejar la respuesta de directions
    const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
      directionsService.value?.route(request, (result, status) => {
        if (status === 'OK' && result) {
          resolve(result)
        } else {
          reject(new Error(`Error en el cálculo de la ruta: ${status}`))
        }
      })
    })

    // Mostrar la ruta en el mapa
    directionsRenderer.value.setDirections(result)

    // Ajustar el mapa para mostrar la ruta completa
    if (map.value && result.routes[0]?.bounds) {
      map.value.fitBounds(result.routes[0].bounds)
    }

    emit('route-calculated', result)
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Error al calcular la ruta'
    error.value = errorMessage
    emit('error', errorMessage)
    console.error('Error en calculateRoute:', e)
  }
}

// Observar cambios en origen y destino
watch(
  [() => props.origin, () => props.destination, () => props.travelMode],
  async () => {
    if (map.value && !isLoading.value) {
      await calculateRoute()
    }
  },
  { deep: true }
)

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="map-container">
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">Cargando mapa...</div>
    </div>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <button class="retry-button" @click="initMap">Reintentar</button>
    </div>
    <div ref="mapContainer" class="map" :class="{ hidden: isLoading || error }"></div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
  margin-top: 16px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}

.loading,
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

.loading-text {
  color: #666;
  font-size: 14px;
}

.error {
  color: #e74c3c;
  background: #fef2f2;
  border: 1px solid #fee2e2;
}

.retry-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.retry-button:hover {
  background-color: #2980b9;
}

.hidden {
  display: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
