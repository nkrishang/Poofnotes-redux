import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userbase from 'userbase-js'

const initialState = {

    user: null,
    status: 'idle',
    error: null
}

// Async logic

export const userInit = createAsyncThunk('auth/init', () => {

    const appId = process.env.REACT_APP_APP_ID
    const payload = {}

    userbase.init({appId})
    .then((session) => {
      payload.user = session.user;
        
      // Handle loading state    
    })

    return payload
})

export const userLogin = createAsyncThunk('auth/userLogin', (userInfo) => {

    const {username, password} = userInfo;

    let payload = {};

    userbase.signIn({username, password})
    .then((user) => {
        payload.user = user;    
    })
    .catch((error) => {
        console.log(error);
        payload.error = error;
    })

    return payload

})

export const userSignup = createAsyncThunk('auth/userSignup', (userInfo) => {

    const {username, password, email} = userInfo;

    let payload = {};

    userbase.signUp({username, password, email})
    .then((user) => {
        payload.user = user;    
    })
    .catch((error) => {
        console.log(error);
        payload.error = error;
    })

    return payload

})

export const userLogout = createAsyncThunk('auth/userLogout', () => {
    userbase.signOut()
    .then(() => {
        // User logged out
    })

    return {};
})


// Slice

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: {

        [userInit.pending]: (state, action) => {
            state.status = 'pending';
        },

        [userInit.fulfilled]: (state, action) => {
            const { user } = action.payload;
            state.user = user;

            state.status = 'succeeded';
        },

        [userLogin.fulfilled]: (state, action) => {
            const {user, error} = action.payload;

            if (user) state.user = user;
            if (error) state.user = error;
        },

        [userSignup.fulfilled]: (state, action) => {
            const {user, error} = action.payload;

            if (user) state.user = user;
            if (error) state.user = error;
        },

        [userLogout.fulfilled]: (state, action) => {
            state.user = null;
        }
    }

    
})

export default authSlice.reducer; 
