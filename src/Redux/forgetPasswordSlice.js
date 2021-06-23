import { createSlice } from '@reduxjs/toolkit';

export const forgetPasswordSlice = createSlice({

    name :'user',
    initialState : {
        value : JSON.parse(localStorage.getItem('forget_password_user')),
    },
    reducers :{
        setUser: (state , action)=>{
            state.value  = action.payload;
            localStorage.setItem("forget_password_user", JSON.stringify(action.payload));
        },
    }
});


export const {setUser} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;