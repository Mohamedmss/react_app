import {createSlice} from '@reduxjs/toolkit';

export const authenticatedSlice = createSlice({

    name: 'authenticated',
    initialState: {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.access_token;
            localStorage.setItem("token", action.payload.access_token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state, action) => {
            state.token = '';
            state.user = {};
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    }
});


export const {login, logout} = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
