import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Login</h1>
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
        Log in with Auth0
      </Button>
    </div>
  );
};

export default LoginPage;
