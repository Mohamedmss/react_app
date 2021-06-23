import React                 from 'react';
import '../Login/Login.css'
import {Field, Form, Formik} from 'formik';
import axios                 from "axios";
import {useHistory}          from "react-router-dom";
import {useDispatch}         from "react-redux";
import {setUserAction}       from "../../Redux/Actions/setUserAction";

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

function ForgetPassword() {
    let history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className = "login-wrapper">
            <Formik
                initialValues = {{
                    email: '',
                }}
                onSubmit = {values => {
                    axios.post('https://boiler-stage.ibtikar.sa/api/v1/users/password/forget', {
                        email: values.email,
                    }, {
                        headers: {
                            "X-Api-Key": "boilerplate_react",
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        }
                    }).then(function (response) {
                        dispatch(setUserAction({"email":values.email}));
                        history.push('/validate-token');
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

                        <button type = "submit" className = "btn btn-dark btn-lg btn-block">
                            Send
                        </button>

                    </Form>
                )}

            </Formik>
        </div>
    );
}

export default ForgetPassword;
