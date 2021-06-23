import React                      from 'react';
import '../Login/Login.css'
import {Field, Form, Formik}      from 'formik';
import axios                      from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUserAction}            from "../../Redux/Actions/setUserAction";
import {useHistory}               from "react-router-dom";

function ValidateToken() {
    let history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);

    return (
        <div className = "login-wrapper">
            <Formik
                initialValues = {{
                    token: '',
                }}
                onSubmit = {values => {
                    axios.post('https://boiler-stage.ibtikar.sa/api/v1/users/password/validate-token', {
                        email: user.email,
                        token: values.token,
                    }, {
                        headers: {
                            "X-Api-Key": "boilerplate_react",
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        }
                    }).then(function (response) {
                        dispatch(setUserAction({"email": user.email,"token":values.token}));
                        history.push('/reset-password');
                    }).catch(function (error) {
                        console.log(error);
                        alert(error.message);
                    });
                }}
            >

                {({errors, touched, isValidating}) => (
                    <Form>

                        <div className = "form-group">
                            <label>Token</label>
                            <Field name = "token" className = "form-control"
                                   placeholder = "Enter Token" type = "text"/>
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

export default ValidateToken;
