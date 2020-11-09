import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import '../App.css';
import '../output.css'

function Dashboard() {

    const { user } = useSelector(state => state.auth);

    return(

        <div>
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