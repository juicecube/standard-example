import * as React from 'react';
import { useLocalStorage } from 'example/hooks/use-localstorage';

import './index.scss';

export const withAuthenticationHoc = <P extends object>(WrappedComponent:React.ComponentType<P>) : React.FunctionComponent<P> => {
  const withAuthentication = (props:P) => {
    const [authentication] = useLocalStorage('authentication');
    if (!authentication) {
      window.browserHistory.push('/login');
      return null;
    }
    return <WrappedComponent {...props}/>;
  };

  // const wrappedComponentName = WrappedComponent.displayName
  //   || WrappedComponent.name
  //   || 'Component';

  // withAuthentication.displayName = `withFoo(${wrappedComponentName})`;

  return withAuthentication;
}