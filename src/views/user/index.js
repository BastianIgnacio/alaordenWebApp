import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
);

const User = ({ match }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/registrar`}
            render={(props) => <Register {...props} />}
          />
          <Route
            path={`${match.url}/recuperar-contrasena`}
            render={(props) => <ForgotPassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
