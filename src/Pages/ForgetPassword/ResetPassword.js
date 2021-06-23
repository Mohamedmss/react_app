import React                 from 'react';
import {Field, Form, Formik} from 'formik';
import '../Register/Register.css';
import axios                 from "axios";
import {useSelector}         from "react-redux";
import {useHistory}          from "react-router-dom";

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

function ResetPassword() {
    const user = useSelector((state) => state.user.value);
    let history = useHistory();

    return (
        <div className = "register-wrapper">

            <Formik
                initialValues = {{
                    password: '',
                    password_confirm: '',
                }}
                onSubmit = {values => {
                    axios.post('https://boiler-stage.ibtikar.sa/api/v1/users/password/reset', {
                        email: user.email,
                        password: values.password,
                        token: user.token,
                    }, {
                        headers: {
                            "X-Api-Key": "boilerplate_react",
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        }
                    }).then(function (response) {
                        history.push('/users');
                    }).catch(function (error) {
                        console.log(error);
                    });
                }}
            >

                {({errors, touched, isValidating}) => (
                    <Form>

                        <h3>Reset Password</h3>

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

                        <button type = "submit" className = "btn btn-dark btn-lg btn-block" disabled = {isValidating}>
                            Reset
                        </button>

                    </Form>
                )}


            </Formik>

        </div>
    );
}

export default ResetPassword;
