import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === false
            ? <Component {...props} />
            : <Redirect to={{pathname: '/users', state: {from: props.location}}} />
    )} />
);

export default GuestRoute;