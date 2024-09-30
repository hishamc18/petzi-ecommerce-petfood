import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Style.css'

function Signin() {
    let navigate = useNavigate();

    return (
        <div className="form-container">
            <Formik
                initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = "Username Required";
                    }
                    if (!values.email) {
                        errors.email = "Email Required";
                    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                        errors.email = "Invalid email address";
                    }
                    if (!values.password) {
                        errors.password = "Password Required";
                    } else if (values.password.length < 6) {
                        errors.password = "Password must be at least 6 characters";
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = "Confirm Password Required";
                    } else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = "Passwords Must Match";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                    try {
                        // Check if email already exists in db.json
                        const response = await axios.get("http://localhost:5001/users");
                        const users = response.data;

                        // Check if the email is already registered
                        const userWithSameEmail = users.find((user) => user.email === values.email);

                        if (userWithSameEmail) {
                            setFieldError("email", "An account with this email already exists");
                            setSubmitting(false);
                        } else {
                            // If email is unique, proceed to create the account
                            await axios.post("http://localhost:5001/users", values);
                            alert("Account Created, You're ready to login");
                            navigate("/");
                        }
                    } catch (error) {
                        console.error("Error checking email or creating account:", error);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="logo">
                            <img src="src/assets/logo.png" alt="Logo" />
                        </div>
                        <Field type="text" name="username" placeholder="Username" />
                        <ErrorMessage name="username" className="error-message" component="div" />
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" className="error-message" component="div" />
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" className="error-message" component="div" />
                        <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <ErrorMessage name="confirmPassword" className="error-message" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Signin;
