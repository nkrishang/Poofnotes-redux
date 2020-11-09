import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import './App.css';
import './output.css';

import { useDispatch, useSelector } from 'react-redux'
import { userInit, userLogout } from './features/auth/authSlice';

import userbase from 'userbase-js'

import Dashboard from './pages/dashboard';
import Auth from './features/auth/auth';
import useLocalStorageState from './utils/localstorage'


function PrivateRoute({ children, session, ...rest }) {
  
  const { user } = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user || session) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {

  const dispatch = useDispatch(); 

  const [session, setSession] = useLocalStorageState('session', true);

  React.useEffect(() => {

    const appId = process.env.REACT_APP_APP_ID
    userbase.init({appId: appId})
    .then((session) => {
      
      if(!session.user) {
        setSession(false)
        return
      };

      setSession(true);
      dispatch(userInit(session.user));      
    })
// eslint-disable-next-line
  }, [])

  return (
    <Router>

      <button onClick={() => {
        setSession(false)
        dispatch(userLogout())
      }}>
        Logout
      </button>

      <Link to="/">protected page</Link>

      <Switch>
        {/* Private route - access only if the user is logged in.*/}
        
        <PrivateRoute session={session} exact path='/'>
          <Dashboard />
        </PrivateRoute>

        {/*If user is not logged in or is new, redirect to this path*/}
        <Route exact path="/auth">
          <Auth handleSession={(bool) => setSession(bool)}/>
        </Route>

      </Switch>
        
    </Router>
  )
}

export default App;
