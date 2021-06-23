import {configureStore}      from '@reduxjs/toolkit'
import authenticatedReducer  from "./authenticatedSlice";
import forgetPasswordReducer from "./forgetPasswordSlice";

export default configureStore({
    reducer: {
        user: forgetPasswordReducer,
        authenticated: authenticatedReducer,
    },
})