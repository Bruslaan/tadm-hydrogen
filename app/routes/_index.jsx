import {redirect} from 'react-router';
import {getLocaleFromRequest} from '~/lib/utils';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request}) {
  const locale = getLocaleFromRequest(request);
  
  // Redirect to the appropriate locale path
  if (locale.pathPrefix) {
    return redirect(locale.pathPrefix);
  }
  
  // If no path prefix (default locale), redirect to the localized index
  return redirect('');
}

export default function RootIndex() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */