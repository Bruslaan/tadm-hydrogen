import enTranslations from './translations/EN.json';
import deTranslations from './translations/DE.json';
import type {Locale} from './i18n';

export const translations = {
  'en': enTranslations,
  'de': deTranslations,
} as const;

export type TranslationKey =
  | keyof typeof enTranslations
  | `${keyof typeof enTranslations}.${string}`;

export type SupportedLanguage = keyof typeof translations;

/**
 * Get translation for a specific key and locale
 */
export function getTranslation(
  locale: Locale,
  key: string,
  fallback?: string,
): string {
  const langCode = locale.language.toLowerCase() as SupportedLanguage;
  const localeTranslations = translations[langCode] || translations['en'];

  const keys = key.split('.');
  let value: any = localeTranslations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      value = undefined;
      break;
    }
  }
  
  // If translation not found, try fallback to English
  if (value === undefined && langCode !== 'en') {
    let fallbackValue: any = translations['en'];
    for (const k of keys) {
      if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
        fallbackValue = fallbackValue[k];
      } else {
        fallbackValue = undefined;
        break;
      }
    }
    value = fallbackValue;
  }
  
  return typeof value === 'string' ? value : fallback || key;
}

/**
 * Translation hook for React components
 */
export function useTranslation(locale: Locale) {
  return {
    t: (key: string, fallback?: string) =>
      getTranslation(locale, key, fallback),
  };
}

/**
 * Get language code from locale
 */
function getLanguageCode(locale: Locale): SupportedLanguage {
  // Extract language code from pathPrefix
  if (locale.pathPrefix === '/') {
    return 'en'; // Default locale
  }

  const code = locale.pathPrefix.slice(1).split('-')[0].toLowerCase(); // Remove '/' and get first part
  return (code as SupportedLanguage) || 'en';
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(
  langCode: string,
): langCode is SupportedLanguage {
  return langCode in translations;
}

/**
 * Get all available languages
 */
export function getAvailableLanguages(): SupportedLanguage[] {
  return Object.keys(translations) as SupportedLanguage[];
}
