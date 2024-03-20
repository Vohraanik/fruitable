import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute(props) {
    const auth = true;
    return (
      
    auth ? <Outlet/>: <Navigate to="/"  replace/>

    );
}

export default PrivateRoute;