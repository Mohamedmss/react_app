import {setUser} from "../forgetPasswordSlice";
export const setUserAction = user => dispatch => {
    dispatch(setUser(user));
};