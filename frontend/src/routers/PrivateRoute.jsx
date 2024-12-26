import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');
      if(!token) {
        return <Navigate to="/api/users/login"/>
      }
      return children ? children : <Outlet/>
    
}


export default PrivateRoute