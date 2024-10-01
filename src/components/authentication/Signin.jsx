import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Style.css'

function Signin() {
    let navigate = useNavigate();

    // Define Yup validation schema
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username Required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords Must Match")
            .required("Confirm Password Required")
    });

    return (
        <div className="form-container">
            <Formik
                initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
                validationSchema={validationSchema} // Adding the Yup validation schema
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
                            navigate("/login");
                        }
                    } catch (error) {
                        console.error("Error checking email or creating account:", error);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="logo">
                            <img src="src/assets/logo/logo.png" alt="Logo" />
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
