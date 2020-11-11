import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from '../features/auth/authSlice';

import '../App.css';
import '../output.css'

import NoteInput from '../features/input/input';

import CircularProgress from '@material-ui/core/CircularProgress';

function Dashboard({ handleSession }) {

    // Redux + router objects

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let history = useHistory();


    // Log out logic

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

            <div className="h-10 flex items-center justify-end">
                <button onClick={handleLogout} type="button" className="mx-8 float-right inline-block align-baseline text-md text-gray-600 hover:text-blue-800">
                    Log out
                </button>
            </div>
      
            <div className="m-auto text-center">
                <h1 className="font-mono text-4xl text-gray-900 font-black">Poof Notes</h1>
                <h3 className="font-serif text-lg text-gray-600">Make simple, tweet sized, shareable notes.</h3>
            </div>

            <div className="flex justify-center">
                {user ?

                <>
                    <NoteInput />
                </>

                :

                <CircularProgress className="my-4"/>

                }
            </div>
            
        </div>
    )
}

export default Dashboard;