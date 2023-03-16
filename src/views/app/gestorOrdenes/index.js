import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const VisualizadorCocina = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './visualizadorCocina')
);
const EnCola = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './enCola')
);
const EnPreparacion = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './enPreparacion')
);

const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/visualizadorCocina`}
      />
      <Route
        path={`${match.url}/visualizadorCocina`}
        render={(props) => <VisualizadorCocina {...props} />}
      />
      <Route
        path={`${match.url}/enCola`}
        render={(props) => <EnCola {...props} />}
      />
      <Route
        path={`${match.url}/enPreparacion`}
        render={(props) => <EnPreparacion {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
