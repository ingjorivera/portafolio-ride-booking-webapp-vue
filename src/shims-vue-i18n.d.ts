import 'vue-i18n'
import { DefineLocaleMessage } from 'vue-i18n'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    messages: typeof import('./data/locales/en.json')
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: Record<string, unknown>) => string
    $i18n: {
      locale: string
      t: (key: string, values?: Record<string, unknown>) => string
    }
  }
}
