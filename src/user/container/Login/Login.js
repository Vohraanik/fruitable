import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../../redux/slice/auth.slice';
import { Navigate } from 'react-router-dom';

function Login() {
    const [currState, setCurrState] = useState("login");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { error, isLoading } = auth;
    console.log(auth);
    

    const validationSchema = Yup.object({
        name: currState === "Sign Up" ? Yup.string().required('Name is required') : null,
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: currState !== "forgotPassword" ? Yup.string().required('Password is required') : null,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (currState === "login") {
                dispatch(login(values));
            } else if (currState === "Sign Up") {
                dispatch(register({ ...values, role: 'user' }));
            } else if (currState === "forgotPassword") {
    
            }
            resetForm();
        }
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    const handleLoginWithGoggle = () => {
        window.location.href = "http://localhost:8080/api/v1/users/googleLogin";
    }

    if(auth.isLogin){
        return <Navigate to="/" />
    }

    return (
        <div className='login-popup'>
            <form onSubmit={handleSubmit} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                </div>

                {/* Display Redux error */}
                {error && <div className="error-message">{error}</div>}

                <div className='login-popup-inputs'>
                    {currState === "Sign Up" && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {touched.name && errors.name ? (
                                <div className="error">{errors.name}</div>
                            ) : null}
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email ? (
                            <div className="error">{errors.email}</div>
                        ) : null}
                    </div>
                    {currState !== "forgotPassword" && (
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {touched.password && errors.password ? (
                                <div className="error">{errors.password}</div>
                            ) : null}
                        </div>
                    )}
                </div>

                <button type="submit" disabled={isLoading}>
                    {currState === "Sign Up" ? "Create Account" : currState === "forgotPassword" ? "Reset Password" : "Login"}
                </button>

                {currState === "login" && (
                    <p>
                        Forgot your password?{" "}
                        <span onClick={() => setCurrState("forgotPassword")}>Click here</span>
                    </p>
                )}
                {currState === "login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign Up")}>Sign Up</span>
                    </p>
                ) : currState === "Sign Up" ? (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("login")}>Login</span>
                    </p>
                ) : (
                    <p>
                        Remember your password?{" "}
                        <span onClick={() => setCurrState("login")}>Login</span>
                    </p>
                )}
            </form>
            <button onClick={handleLoginWithGoggle}>Sign with login</button>
        </div>
    );
}

export default Login;
