import { createI18n } from 'vue-i18n'
import type { I18nOptions } from 'vue-i18n'

// Import translations
import en from './data/locales/en.json'
import es from './data/locales/es.json'

const translations = {
  en,
  es,
}

const i18nOptions: I18nOptions = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations,
  legacy: true, // Set to true to use template syntax with $t
}

const i18n = createI18n(i18nOptions)

export default i18n
