import React from 'react';
import { Navigate, Route,Outlet } from 'react-router-dom';
import { Index, Login } from './Paths';
import { useAuthContext } from '../utils/authContext'; 

export default function PublicRoute() {
  const {isAuthenticated} = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={Index}/>;
  }

  return (
   
      <Outlet />
    
  );
}
/*
export default function PublicRoute({ path, ...rest }) {
  const { isAuthenticated } = isLogin();

  return (
    <Route {...rest} path={path} element={isAuthenticated ? <Navigate to={Index} /> : <Navigate to={Login} />} />
  );
}*/
/*
export default function PublicRoute({ component: Component, ...rest }) {
  const isAuthenticated = isAdmin();
  return (
    <Route
      {...rest}
      element={!isAuthenticated ? <Component /> : <Navigate to={Index} />}
    />
  );
}*/