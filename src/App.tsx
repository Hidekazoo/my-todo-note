import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { RequestProvider } from "./context/RequestContext";
import { Dashboard } from "./pages/Dashboard";

import { Home } from "./pages/Home";
import { RequestWrapper } from "./components/RequestWrapper";

const Login: React.FC = () => {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

const NotFound: React.FC = () => {
  return <div>404 Not Found</div>;
};

const UnauthenticatedRoutes: RouteProps[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const AuthenticatedRoutes: RouteProps[] = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

const AuthenticatedRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  const renderRedicrect = () => {
    return <Redirect to="/" />;
  };
  return (
    <Route
      {...rest}
      component={isAuthenticated ? component : renderRedicrect}
    />
  );
};

const AppRoutes = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <div>Load中...</div>;
  }
  return (
    <Switch>
      {AuthenticatedRoutes.map((route, index) => (
        <AuthenticatedRoute key={index} {...route} />
      ))}
      {UnauthenticatedRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
};

const BaseApp: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
export const App = RequestWrapper(BaseApp);
