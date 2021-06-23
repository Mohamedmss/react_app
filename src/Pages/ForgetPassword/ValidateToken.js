import React, {useState} from 'react';
import '../Login/Login.css'
import {Form, Formik}      from 'formik';
import axios                      from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUserAction}            from "../../Redux/Actions/setUserAction";
import {useHistory}               from "react-router-dom";
import OtpInput from 'react-otp-input';

function ValidateToken() {
    let history = useHistory();
    const dispatch = useDispatch();

    const [token, setToken] = useState([]);

    const user = useSelector((state) => state.user.value);

    let handleChange = (otp) => setToken(otp);

    return (
        <div className = "login-wrapper">
            <Formik
                initialValues = {{
                    token: '',
                }}
                onSubmit = {values => {
                    axios.post('https://boiler-stage.ibtikar.sa/api/v1/users/password/validate-token', {
                        email: user.email,
                        token: token,
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
                        <div className="form-group center-class">
                                <OtpInput value={token} onChange={handleChange} numInputs={10}
                                          separator={<span>-</span>} containerStyle={"full-width"} inputStyle={"otp-input"}/>
                        </div>
                        <div className="form-group center-class">
                            <div className="col-md-3 center-class">
                                <button type = "submit" className = "btn btn-dark btn-lg btn-block">
                                    Send
                                </button>
                            </div>
                        </div>

                    </Form>
                )}

            </Formik>
        </div>
    );
}

export default ValidateToken;
