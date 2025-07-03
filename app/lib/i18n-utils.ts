import enUSTranslations from './translations/en-US.json';
import deDETranslations from './translations/de-DE.json';

export const translations = {
  'en-US': enUSTranslations,
  'de-DE': deDETranslations,
};

export type TranslationKey = keyof typeof enUSTranslations.buttons;
export type SupportedLocale = keyof typeof translations;

export function getTranslation(
  locale: string,
  category: 'buttons',
  key: TranslationKey,
): string {
  const normalizedLocale = locale.toLowerCase() as SupportedLocale;
  const localeTranslations = translations[normalizedLocale] || translations['en-US'];
  
  return localeTranslations[category][key] || translations['en-US'][category][key];
}

export function t(locale: string, key: TranslationKey): string {
  return getTranslation(locale, 'buttons', key);
}