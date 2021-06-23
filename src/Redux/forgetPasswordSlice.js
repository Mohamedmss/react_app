import { createSlice } from '@reduxjs/toolkit';

export const forgetPasswordSlice = createSlice({

    name :'user',
    initialState : {
        value : {}
    },
    reducers :{
        setUser: (state , action)=>{
            console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
            state.value  = action.payload;
        },
    }
});


export const {setUser} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;