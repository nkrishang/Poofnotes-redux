import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './App.css';
import './output.css';

import { useDispatch, useSelector } from 'react-redux'
import { userInit } from './features/auth/authSlice';

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
        (user || session.active) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
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

  const [session, setSession] = useLocalStorageState('session', {
    active: true,
    username: ''
  });

  React.useEffect(() => {

    const appId = process.env.REACT_APP_APP_ID
    userbase.init({appId: appId})
    .then((session) => {
      
      if(!session.user) {
        setSession({active: false, username: ""})
        return
      };

      const username = session.user.username;
      setSession({active: true, username})

      dispatch(userInit(session.user));      
    })
// eslint-disable-next-line
  }, [])

  return (
    <Router>

      <Switch>

      <Route exact path="/">
        {session.active ? <Redirect to={`/${session.username}`}/> : <Redirect to="/auth"/>}
      </Route>

        {/*If user is not logged in or is new, redirect to this path*/}
        <Route exact path="/auth">

          {session.active ? <Redirect to={`/${session.username}`}/> : <Auth handleSession={newSession => setSession(newSession)} />}

        </Route>

        {/* Private route - access only if the user is logged in.*/}
        
        <PrivateRoute session={session} path={`/${session.username}`}>
          <Dashboard handleSession={newSession => setSession(newSession)} />
        </PrivateRoute>

        <Route path="/*">
          {/* {session.active ? <Redirect to={`/${session.username}`}/> : <Redirect to="/auth"/>} */}
          <Redirect to="/"/>
        </Route>

      </Switch>
        
    </Router>
  )
}

export default App;
