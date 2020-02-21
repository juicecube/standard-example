import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import * as History from 'history';
import { store } from './redux/root-store';
import { routes } from './pages/router';
import './commons/css/style.scss';

export const browserHistory = History.createBrowserHistory();
const rootElement = document.getElementById('root');

window.browserHistory = browserHistory;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Switch>
          {
            routes.map((val, key) => <Route {...val} key={`route_${key}`}/>)
          }
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  rootElement,
);
