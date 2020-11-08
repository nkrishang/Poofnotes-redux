import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import './output.css';

import { useDispatch, useSelector } from 'react-redux'
import { userInit } from './features/auth/authSlice';

import Dashboard from './pages/dashboard';


function PrivateRoute({children, ...rest}) {

  const { user } = useSelector(state => state.auth);

  return(
    <Route
      {...rest}
      render={({ location }) => {
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {from : location}
            }} 
          />
        )
      }}
    />
  )
}

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {

    dispatch(userInit());

  }, [dispatch])

  return (
    <Router>

      <Switch>
        {/*Private route - access only if the user is logged in.*/}
        <PrivateRoute path="/">
          <Dashboard />
        </PrivateRoute>

        {/*If user is not logged in or is new, redirect to this path*/}
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>
        
    </Router>
  )
}

export default App;
