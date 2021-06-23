import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {GuestNavigationBar}           from "./Components/GuestNavigationBar";
import GuestRoute                     from "./Components/GuestRoute";
import GuardedRoute    from "./Components/GuardedRoute";
import {Home}          from "./Pages/Home";
import Login           from "./Pages/Login/Login";
import Register        from "./Pages/Register/Register";
import Users           from "./Pages/Users/Users";
import {NotFound}      from "./Pages/NotFound";
import ForgetPassword  from "./Pages/ForgetPassword/ForgetPassword";
import ValidateToken   from "./Pages/ForgetPassword/ValidateToken";
import ResetPassword   from "./Pages/ForgetPassword/ResetPassword";
import React           from "react";
import {NavigationBar} from "./Components/NavigationBar";
import {useSelector}   from "react-redux";

function App() {

    const token = useSelector((state) => state.authenticated.access_token);

    console.log("token : ",token);
    console.log("localStorage : ",localStorage.getItem('token'));
//     const token = localStorage.getItem('token');
// console.log(token);
    return (
        <BrowserRouter>
            {token ? <NavigationBar/> : <GuestNavigationBar/>}
            <Switch>
                <Route exact path = "/" component = {Home}/>

                <GuestRoute path = "/register" component = {Register} auth = {!!token}/>
                <GuestRoute path = "/login" component = {Login} auth = {!!token}/>
                <GuestRoute path = "/forget-password" component = {ForgetPassword} auth = {!!token}/>
                <GuestRoute path = "/validate-token" component = {ValidateToken} auth = {!!token}/>
                <GuestRoute path = "/reset-password" component = {ResetPassword} auth = {!!token}/>

                <GuardedRoute path = "/users" component = {Users} auth = {!!token}/>
                <Route component = {NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
