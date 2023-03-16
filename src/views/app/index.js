import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Tienda = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './tienda')
);
const Ventas = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './ventas')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);
const GestorOrdenes = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './gestorOrdenes')
);
const Configuraciones = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './configuraciones')
);
const QrGenerador = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './qrGenerador')
);
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            <Route
              path={`${match.url}/tienda`}
              render={(props) => <Tienda {...props} />}
            />
            <Route
              path={`${match.url}/ventas`}
              render={(props) => <Ventas {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/gestorOrdenes`}
              render={(props) => <GestorOrdenes {...props} />}
            />
            <Route
              path={`${match.url}/configuraciones`}
              render={(props) => <Configuraciones {...props} />}
            />
            <Route
              path={`${match.url}/qrGenerador`}
              render={(props) => <QrGenerador {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
