import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Categorias = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './categorias')
);
// eslint-disable-next-line no-unused-vars
const Productos = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './productos')
);
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <Route
        path={`${match.url}/categorias`}
        render={(props) => <Categorias {...props} />}
      />
      <Route
        path={`${match.url}/productos`}
        render={(props) => <Productos {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
