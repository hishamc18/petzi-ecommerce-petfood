

// login.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import './Style.css'

function Login() {
    const navigate = useNavigate();

    // Validation function
    const validate = (values) => {
        const errors = {};

        // Email validation
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        // Password validation
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // Fetch users from db.json
            const response = await axios.get("http://localhost:5001/users");
            const users = response.data;

            // Find the user with the entered email and password
            const user = users.find((u) => u.email === values.email && u.password === values.password);

            if (user) {
                // Store the user's username in localStorage
                localStorage.setItem('username', user.username);

                // If user is found, navigate to the home page
                navigate("/home");
            } else {
                // If no user matches, show error message
                setErrors({ login: "Invalid email or password" });
            }
        } catch (error) {
            setErrors({ login: "Something went wrong. Please try again later." });
        }
        setSubmitting(false);
    };

    return (
        <div className="form-container">
            <Formik initialValues={{ email: "", password: "" }} validate={validate} onSubmit={handleSubmit}>
                {({ isSubmitting, errors }) => (
                    <Form className="form">
                        <div className="logo">
                            <img src="src/assets/logo.png" alt="Logo" />
                        </div>

                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="error-message" />

                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className="error-message" />

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Logging In..." : "Log In"}
                        </button>
                        {errors.login && <div className="error-message">{errors.login}</div>}
                        <p>
                            No Account?{" "}
                            <Link className="link" to={"signin"}>
                                Create Account
                            </Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;