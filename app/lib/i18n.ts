import type {I18nBase} from '@shopify/hydrogen';

export interface I18nLocale extends I18nBase {
  pathPrefix: string;
}

export const SUPPORTED_LOCALES = ['en-US', 'de-DE'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split('/')[1]?.toLowerCase() ?? '';

  type I18nFromUrl = [I18nLocale['language'], I18nLocale['country']];

  let pathPrefix = '';
  let [language, country]: I18nFromUrl = ['EN', 'US'];

  if (/^[a-z]{2}-[a-z]{2}$/i.test(firstPathPart)) {
    const normalizedLocale = firstPathPart.toLowerCase();
    
    if (SUPPORTED_LOCALES.includes(normalizedLocale as SupportedLocale)) {
      pathPrefix = '/' + normalizedLocale;
      [language, country] = normalizedLocale.split('-').map(part => part.toUpperCase()) as I18nFromUrl;
    }
  }

  return {language, country, pathPrefix};
}
