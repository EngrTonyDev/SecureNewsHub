import { createContext, useCallback, useContext, useMemo, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";


const Token = 'token';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const token = window.localStorage.getItem(Token);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  
  useEffect(() => {
    if (token && token !== "undefined") {
      const user = jwt_decode(token);
      if (user.role.name === 'admin') {
        setIsAdmin(true);
        
      }
      setIsAuthenticated(true);
    } 
  }, [token]);



  const login = useCallback(function (token) {

    window.localStorage.setItem(Token, token)
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(function () {

    window.localStorage.removeItem(Token);
    setIsAuthenticated(false);
    window.location.href = "/";
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      isAdmin,
      token,
      
    }),
    [token, isAuthenticated, isAdmin, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object
};

export function useAuthContext() {
  return useContext(AuthContext);
}