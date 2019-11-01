import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { store } from './redux/root-store';

import { routes } from './pages/router';
require('./commons/css/style.scss');

const root_element = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {
            routes.map((val, key) => <Route {...val} key={`route_${key}`}/>)
          }
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  root_element,
);