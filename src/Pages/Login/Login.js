import React                 from 'react';
import './Login.css';
import {Field, Form, Formik} from 'formik';
import axios                 from "axios";
import {useDispatch}         from "react-redux";
import {loginAction}         from "../../Redux/Actions/loginAction";

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

function validatePassword(value) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

function Login() {
    const dispatch = useDispatch();

    return (
        <div className = "login-wrapper">
            <h1>Please Log In</h1>
            <Formik
                initialValues = {{
                    email: '',
                    password: '',
                }}
                onSubmit = {values => {
                    axios.post('https://boiler-stage.ibtikar.sa/api/v1/users/login', {
                        email: values.email,
                        password: values.password,
                        client_id: 2,
                        client_secret: "fhMZQxfVREJrII50IeN4ThIZCerdOFjxiRGu7Lc0",
                    }, {
                        headers: {
                            "X-Api-Key": "boilerplate_react",
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        }
                    }).then(function (response) {
                        dispatch(loginAction(response.data.data));
                    }).catch(function (error) {
                        console.log(error);
                        alert(error.message);
                    });
                }}
            >

                {({errors, touched, isValidating}) => (
                    <Form>

                        <div className = "form-group">
                            <label>Email</label>
                            <Field name = "email" validate = {validateEmail} className = "form-control"
                                   placeholder = "Enter email" type = "email"/>
                            {errors.email && touched.email && <div className = "error-message">
                                {errors.email}
                            </div>}
                        </div>

                        <div className = "form-group">
                            <label>Password</label>
                            <Field name = "password" validate = {validatePassword} type = "password"
                                   className = "form-control" placeholder = "Enter password"/>
                            {errors.password && touched.password && <div className = "error-message">
                                {errors.password}
                            </div>}
                        </div>

                        <button type = "submit" className = "btn btn-dark btn-lg btn-block" disabled = {isValidating}>
                            Login
                        </button>

                        <p className = "forgot-password text-right">
                            <a href = "/forget-password">forget password?</a>
                        </p>
                    </Form>
                )}

            </Formik>
        </div>
    );
}

export default Login;
