import {login} from "../authenticatedSlice";
export const loginAction = user => dispatch => {
    dispatch(login(user));
};