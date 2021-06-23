import {createSlice} from '@reduxjs/toolkit';

export const authenticatedSlice = createSlice({

    name: 'authenticated',
    initialState: {
        token: '',
        user: {},
    },
    reducers: {
        login: (state, action) => {
            console.log("AAAAAAAAAAAAAAAAAAAAA");
            console.log(action.payload);
            state.user = action.payload.user;
            state.token = action.payload.access_token;
            localStorage.setItem("token", action.payload.access_token);

            console.log(state.user);
            console.log(state.token);
        },
        logout: (state, action) => {
            console.log("BBBBBBBBBBBBBBBBBBBBB");
            state.token = '';
            state.user = {};
            localStorage.clear();
        },
    }
});


export const {login, logout} = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
