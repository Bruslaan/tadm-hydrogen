import {Link, useLocation} from 'react-router';
import {LOCALES, getLocalizedPath, removeLocalePrefix} from '~/lib/utils';

/**
 * Language switcher component
 * @param {Object} props
 * @param {string} props.currentLanguage - Current language code
 */
export function LanguageSwitcher({currentLanguage}) {
  const location = useLocation();
  
  // Remove current language prefix from pathname to get base path
  const basePath = removeLocalePrefix(location.pathname);

  return (
    <div className="language-switcher">
      {Object.entries(LOCALES).map(([localeKey, locale]) => {
        const isActive = locale.language === currentLanguage;
        const localizedPath = getLocalizedPath(basePath, locale.pathPrefix);
        
        return (
          <Link
            key={localeKey}
            to={localizedPath}
            className={`language-link ${isActive ? 'active' : ''}`}
            prefetch="intent"
          >
            {locale.label}
          </Link>
        );
      })}
    </div>
  );
}