import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Ventas = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './ventas')
);
const Estadisticas = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './estadisticas')
);
const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} />
      <Route
        path={`${match.url}/ventas`}
        render={(props) => <Ventas {...props} />}
      />
      <Route
        path={`${match.url}/estadisticas`}
        render={(props) => <Estadisticas {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
