import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ProductContext } from "../context/ProductContext";
import "./authStyle.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(ProductContext);

    // Validation using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // Fetching users 
            const response = await axios.get("http://localhost:5001/users");
            const users = response.data;

            // finding the  usermail and password
            const user = users.find((u) => u.email === values.email && u.password === values.password);

            if (user) {
                if(user.email === "hishamc18@gmail.com"){
                    navigate("/orders")
                }
                    else{
                        login(user.username); //fn() in context
                        navigate("/");
                    }
            } else {
                setErrors({ login: "Invalid email or password" });
            }
        } catch (error) {
            setErrors({ login: "Something went wrong. Please try again later." });
        }
        setSubmitting(false);
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="form">
                        <div className="logo">
                            <img src="src/assets/logo/logo.png" alt="Logo" />
                        </div>
                        <h2 id="welcomeMessage">Welcome Back!</h2>
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="error-message" />
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className="error-message" />
                        <button type="submit" disabled={isSubmitting}>
                            Log In
                        </button>
                        {errors.login && <div className="error-message">{errors.login}</div>}
                        <p>
                            No Account?{" "}
                            <Link className="link" to={"/signin"}>
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