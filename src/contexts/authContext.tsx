import React, { createContext, useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextInterface {
    token: string | null;
    authenticate: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    signout: () => void;
    isAuthenticated: boolean;
  }

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = ({children}) => {
    const [token, setToken] = useState<string|null>(localStorage.getItem("authToken"));
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
          localStorage.setItem("authToken", token);
        } else {
          localStorage.removeItem("authToken");
        }
      }, [token]);

      const authenticate = async (username: string, password: string) => {
        try {

          const response = await fetch("https://api.themoviedb.org/3/authentication/token/validate_with_login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
          } else {
            throw new Error("Login failed");
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }
      };

      const signup = async (username: string, password: string) => {
        try {
  
          const response = await fetch("https://api.themoviedb.org/3/authentication/session/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            navigate("/");
          } else {
            throw new Error("Signup failed");
          }
        } catch (error) {
          console.error("Signup error:", error);
        }
      };
    
      const signout = () => {
        setToken(null);
        navigate("/login");
      };

      return (
        <AuthContext.Provider
          value={{
            token,
            authenticate,
            signup,
            signout,
            isAuthenticated: !!token,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  
  export default AuthContextProvider;