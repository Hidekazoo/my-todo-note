import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  RouteProps,
} from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      Home
      <Link to="/login">Login</Link>
    </div>
  );
};
const Login: React.FC = () => {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return <div>Dashboard</div>;
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

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return <div>{children}</div>;
      }}
    />
  );
};

const AppRoutes = () => {
  return (
    <Switch>
      {AuthenticatedRoutes.map((route, index) => (
        <AuthenticatedRoute {...route} key={index} />
      ))}
      {UnauthenticatedRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
