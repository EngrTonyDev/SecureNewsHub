import React from 'react';
import { Navigate,Route,Outlet } from 'react-router-dom';
import { Index,Login,Categories } from './Paths';
import { useAuthContext } from '../utils/authContext';


export default function PrivateRoute({ element: Element, ...rest }) {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/" replace />}
    />
  );
}