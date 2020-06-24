import * as React from 'react';
import { storeManage, SESSION, USER_TOKEN, LOCAL } from 'example/utils/storage-manage';

import './index.scss';

export const withAuthenticationHoc = <P extends object>(WrappedComponent:React.ComponentType<P>):React.FunctionComponent<P> => {
  const withAuthentication = (props:P) => {
    const authentication = storeManage.get(USER_TOKEN, LOCAL);
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
};
