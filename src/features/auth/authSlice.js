import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userbase from 'userbase-js'

// Async logic


export const userLogin = createAsyncThunk('auth/userLogin', async (userInfo) => {

    const {username, password} = userInfo;
    console.log("login async think initiated")

    let payload = {user: null, error: null};

    try {
        const user = await userbase.signIn({username, password});
        
        if(user) payload.user = user;

    } catch (error) {
        console.log(error);
        payload.error = JSON.stringify(error);
    }

    return payload

})

export const userSignup = createAsyncThunk('auth/userSignup', async (userInfo) => {

    const {username, password, email} = userInfo;

    let payload = {user: null, error: null};

    try {
        const user = await userbase.signUp({username, password, email});
        payload.user = user;

    } catch (error) {
        console.log(error);
        payload.error = JSON.stringify(error);
    }

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

const initialState = {

    user: null,
    status: 'idle',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        userInit(state, action) {
            const user = action.payload;

            console.log("user init initiated")

            if(!user) return

            state.user = user;
            state.status = "succeeded"
        }
    },

    extraReducers: {

        [userLogin.fulfilled]: (state, action) => {
            const {user, error} = action.payload;
            console.log("Login extraReducer initiated")

            if(user) state.user = user;
            state.error = error;

            state.status = 'succeeded'

            console.log(action.payload)

        },

        [userSignup.fulfilled]: (state, action) => {
            const {user, error} = action.payload;
            
            if(user) state.user = user;
            state.error = error;
            state.status = 'succeeded'

        },

        [userLogout.fulfilled]: (state, action) => {
            state.user = null;
            state.status = 'idle'
        }
    }

    
})

export const { userInit } = authSlice.actions;

export default authSlice.reducer; 
