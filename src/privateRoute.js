import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './features/store/stateSlice';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Route 
      {...rest} 
      render={(props) => (
      isLoggedIn
        ? children
        : <Redirect to='/' />
    )} />
  )
}

export default PrivateRoute;