import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Tienda = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './tienda')
);
const Mercadopago = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './mercadopago')
);
const MediosPago = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './mediosPago')
);
const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/tienda`} />
      <Route
        path={`${match.url}/tienda`}
        render={(props) => <Tienda {...props} />}
      />
      <Route
        path={`${match.url}/mercadopago`}
        render={(props) => <Mercadopago {...props} />}
      />
      <Route
        path={`${match.url}/mediosPago`}
        render={(props) => <MediosPago {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
