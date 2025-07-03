import {Link} from 'react-router';
import {useRouteLoaderData} from 'react-router';
import {getLocalizedPath} from '~/lib/utils';

/**
 * A Link component that automatically handles locale prefixes
 * @param {Object} props
 * @param {string} props.to - The destination path
 * @param {React.ReactNode} props.children - The link content
 * @param {Object} props.rest - Other props to pass to Link
 */
export function LocalizedLink({to, children, ...rest}) {
  const rootData = useRouteLoaderData('root');
  const pathPrefix = rootData?.locale?.pathPrefix || '';
  
  const localizedPath = getLocalizedPath(to, pathPrefix);
  
  return (
    <Link to={localizedPath} {...rest}>
      {children}
    </Link>
  );
}