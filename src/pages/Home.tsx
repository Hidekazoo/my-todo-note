import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export const Home: React.FC = (props) => {
  return (
    <div>
      <LoginButton />
    </div>
  );
};
