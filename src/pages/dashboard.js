import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from '../features/auth/authSlice';

import '../App.css';
import '../output.css'

function Dashboard({ handleSession }) {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    let history = useHistory();

    const handleLogout = () => {
    
        handleSession({
            active: false,
            username: ""
        });

        dispatch(userLogout());
        history.replace("/")
    }
    return(

        <div>

        <button onClick={handleLogout}> 
            Logout
        </button>

            {user ?

                <>
                    <h1>Hello World, I am a dashboard.</h1>
                </>

                :

                <p>Loading...</p>
            
            }
        </div>
    )
}

export default Dashboard;