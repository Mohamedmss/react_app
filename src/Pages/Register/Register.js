import React                 from 'react';
import {Field, Form, Formik} from 'formik';
import './Register.css';
import 'react-phone-number-input/style.css'
import axios                 from "axios";
import {useHistory}          from "react-router-dom";

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

function validateUsername(value) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

function validatePhone(value) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

function validatePassword(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (value.length < 8) {
        error = 'minimum length allowed is 8 char';
    }
    return error;
}

function validatePasswordConfirmation(value) {
    let error;
    let pass = document.getElementsByTagName('input')["password"].value;
    if (pass && value) {
        if (pass !== value) {
            error = "Password not matched";
        }
    }
    return error;
}

function Register() {

    let history = useHistory();
    return (
        <div className = "register-wrapper">

            <Formik
                initialValues = {{
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    password_confirm: '',
                }}
                onSubmit = {values => {
                    axios.post('https://boiler-stage.ibtikar.sa/api/v1/users', {
                        name: values.username,
                        email: values.email,
                        password: values.password,
                        password_confirmation: values.password_confirm,
                        mobile_number: "+2" + values.phone,
                    }, {
                        headers: {
                            "X-Api-Key": "boilerplate_react",
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        }
                    }).then(function (response) {
                        history.push('/login');
                    }).catch(function (error) {
                        console.log(error);
                        alert(error.message);
                    });
                }}
            >

                {({errors, touched, isValidating}) => (
                    <Form>

                        <h3>Register</h3>

                        <div className = "form-group">
                            <label>Email</label>
                            <Field name = "email" validate = {validateEmail} className = "form-control"
                                   placeholder = "Enter email" type = "email"/>
                            {errors.email && touched.email && <div className = "error-message">
                                {errors.email}
                            </div>}
                        </div>

                        <div className = "form-group">
                            <label>Username</label>
                            <Field name = "username" validate = {validateUsername} type = "text"
                                   className = "form-control" placeholder = "Username"/>
                            {errors.username && touched.username && <div className = "error-message">
                                {errors.username}
                            </div>}
                        </div>

                        <div className = "form-group">
                            <Field name = "phone" validate = {validatePhone} type = "text" className = "form-control"
                                   placeholder = "Mobile number"/>
                            {errors.phone && touched.phone && <div className = "error-message">
                                {errors.phone}
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

                        <div className = "form-group">
                            <label>Confirm Password</label>
                            <Field name = "password_confirm" validate = {validatePasswordConfirmation} type = "password"
                                   className = "form-control" placeholder = "Confirm password"/>
                            {errors.password_confirm && touched.password_confirm && <div className = "error-message">
                                {errors.password_confirm}
                            </div>}
                        </div>

                        {/*<button type="submit">Submit</button>*/}
                        <button type = "submit" className = "btn btn-dark btn-lg btn-block" disabled = {isValidating}>
                            Register
                        </button>

                        <p className = "forgot-password text-right">
                            Already registered <a href = "/login">log in</a>
                        </p>
                    </Form>
                )}


            </Formik>

        </div>
    );
}

export default Register;
