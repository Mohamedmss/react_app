import {logout} from "../authenticatedSlice";
export const logoutAction = user => dispatch => {
    dispatch(logout());
};