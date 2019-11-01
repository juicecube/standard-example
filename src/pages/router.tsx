import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import * as Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }:any) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

const _loadable = (load_func:any) => {
  return Loadable({
    loader: load_func,
    loading: MyLoadingComponent,
    delay: 200,
  });
};

/**
 * 全局路由表
 */
export let routes:RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: _loadable(() => import('./index')),
    
  },
  {
    component: _loadable(() => import('../component/page-not-found')),
  },
];