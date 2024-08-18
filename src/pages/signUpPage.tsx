import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleSignup = () => {
    loginWithRedirect({
    //  screen_hint: "signup", 
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <Typography variant="h4">Sign Up Today!</Typography>
      <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
        Create an account to add favourites, create Fantasy movies and more.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginLeft: "10px" }}
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
    </div>
  );
};

export default SignupPage;