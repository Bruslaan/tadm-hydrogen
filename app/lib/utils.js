export function getLocaleFromRequest(request) {
    const url = new URL(request.url);

    if (/^\/de($|\/)/.test(url.pathname)) {
        return {
            language: 'DE',
            country: 'DE',
            pathPrefix: '/de',
        };
    } else {
        return {
            language: 'EN',
            country: 'US',
            pathPrefix: '',
        };
    }
}

/**
 * Available locales configuration
 */
export const LOCALES = {
  'en-US': { 
    language: 'EN', 
    country: 'US', 
    label: 'English',
    pathPrefix: ''
  },
  'de-DE': { 
    language: 'DE', 
    country: 'DE', 
    label: 'Deutsch',
    pathPrefix: '/de'
  },
};

/**
 * Get locale string from language and country
 * @param {string} language
 * @param {string} country
 * @returns {string}
 */
export function getLocaleString(language, country) {
  return `${language.toLowerCase()}-${country}`;
}

/**
 * Get URL with locale prefix
 * @param {string} path
 * @param {string} pathPrefix
 * @returns {string}
 */
export function getLocalizedPath(path, pathPrefix) {
  if (!pathPrefix) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${pathPrefix}${cleanPath}`;
}

/**
 * Remove locale prefix from pathname
 * @param {string} pathname
 * @returns {string}
 */
export function removeLocalePrefix(pathname) {
  if (pathname.startsWith('/de/')) {
    return pathname.substring(3);
  }
  if (pathname === '/de') {
    return '/';
  }
  return pathname;
}