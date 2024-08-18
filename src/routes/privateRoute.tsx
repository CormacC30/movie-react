/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/spinner";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}
// @ts-expect-error it's absolutely grand
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return Spinner; // Show a loading state while the auth status is being checked.
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;