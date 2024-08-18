import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";
import MultiSearch from "../components/searchMoviesTV";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <MultiSearch />
      <Typography variant="h2" style={{marginBottom: "2%"}}>Login</Typography>
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
        Log in with Auth0
      </Button>
    </div>
  );
};

export default LoginPage;
