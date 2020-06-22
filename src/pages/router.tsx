import * as React from 'react';
import { Suspense, lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { ErrorBoundary } from 'example/components/error-boundary';

export const _lazy = (loadFunc:() => Promise<any>) => {
  const Component = lazy(loadFunc);
  return () => (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        Loading...
      </div>}
    >
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
};

/**
 * 全局路由表
 */
export const routes:RouteProps[] = [
  {
    path: '/login',
    exact: true,
    component: _lazy(() => import('./login')),
  },
  {
    path: '/',
    exact: true,
    component: _lazy(() => import('./index')),
  },
  {
    component: _lazy(() => import('../components/page-not-found')),
  },
];
