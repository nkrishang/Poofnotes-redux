import React from 'react';

import '../../App.css';
import '../../output.css'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { userLogin, userSignup } from './authSlice';
import useLocalStorage from '../../utils/localstorage'

function Auth({handleSession}) {

  // Locally managed state

  const [authType, setAuthType] = useLocalStorage('auth type', 'signup')

  const [userInfo, setUserInfo] = useLocalStorage("user info", {
      username: '',
      password: '',
      email: ''
  })

  const {username, password, email} = userInfo;

  // Change handlers for locally managed state

  const changeAuthType = () => setAuthType(`${authType === 'login' ? 'signup' : 'login'}`);
  
  const changeUserInfo = e => {
      const target = e.target.name;
      const value = e.target.value;

      switch(target) {

          case "username":
              setUserInfo(user => {
                  return {...user, username: value}
              })
              break;
          case "password":
              setUserInfo(user => {
                  return {...user, password: value}
              })
              break;
          case "email":
              setUserInfo(user => {
                  return {...user, email: value}
              })
              break;
          default:
              console.log("Something's wrong with the login form.")
              return;
      }
  }

  // Redux + router logic
  
  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    // console.log("Login event handler initiated.")

    if(authType === 'login') {
      dispatch(userLogin(userInfo))
    } else {
      dispatch(userSignup(userInfo))
      console.log("Signup event");
    }

    handleSession({
      active: true,
      username
    });

    // React router navigation

    setTimeout(() => {
      // console.log("Timeout working");
      history.replace(`/${username}`)
    }, 1000)
  }

  return (
    <div className="Login my-10">

      <div className="m-auto text-center">
        <h1 className="font-mono text-4xl text-gray-900 font-black">Poof Notes</h1>
        <h3 className="font-serif text-lg text-gray-600">Make simple, tweet sized, shareable notes.</h3>
      </div>

      <div className="w-full max-w-xs mx-auto my-4" >
        <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input name="username" value={username} onChange={changeUserInfo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input name="password" value={password} onChange={changeUserInfo} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            <p style={{display: 'none'}} className="text-red-500 text-xs italic">Please choose a password.</p>
          </div>

          <div className="mb-6" style={{display: `${authType === 'login' ? 'none' : ''}`}}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input name="email" value={email} onChange={changeUserInfo} className="shadow appearance-none text-sm rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="For password recovery (optional)" />
          </div>
          
          <div className="flex items-center justify-between">

            <button className=" bg-transparent hover:bg-gray-800 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded" type="submit">
                {authType === 'login' ? "Log in" : "Sign Up"}
            </button>

            <button type="button" className="inline-block align-baseline text-sm text-gray-600 hover:text-blue-800">
              Forgot Password?
            </button>
            
          </div>

          <button onClick={changeAuthType} className="text-xs text-gray-500 hover:text-blue-800 my-2" type="button">
              {authType === 'login' ? "Sign Up?" : "Log in?"}
          </button>
        </form> 
        <p className="text-center text-gray-500 text-xs m-10">
          This project is <span><a href="https://github.com/nkrishang/Poof-Notes" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">opensource</a></span>.
        </p>
      </div>
    </div>
  );
}

export default Auth;
