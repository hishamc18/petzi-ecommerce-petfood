// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup"; // Import Yup
// import axios from "axios";
// import './Style.css';

// function Login() {
//     const navigate = useNavigate();

//     // Validation schema using Yup
//     const validationSchema = Yup.object().shape({
//         email: Yup.string()
//             .required("Email is required")
//             .email("Invalid email address"),
//         password: Yup.string()
//             .required("Password is required")
//             .min(6, "Password must be at least 6 characters"),
//     });

//     const handleSubmit = async (values, { setSubmitting, setErrors }) => {
//         try {
//             // Fetch users from db.json
//             const response = await axios.get("http://localhost:5001/users");
//             const users = response.data;

//             console.log("Fetched users:", users);

//             //user with the entered email and password
//             const user = users.find((u) => u.email === values.email && u.password === values.password);

//             if (user) {
//                 localStorage.setItem('username', user.username);
//                 navigate("/");
//             } else {
//                 setErrors({ login: "Invalid email or password" });
//             }
//         } catch (error) {
//             console.error("Error fetching users:", error);
//             setErrors({ login: "Something went wrong. Please try again later." });
//         }
//         setSubmitting(false);
//     };

//     return (
//         <div className="form-container">
//             <Formik
//                 initialValues={{ email: "", password: "" }}
//                 validationSchema={validationSchema} // Set validation schema
//                 onSubmit={handleSubmit}
//             >
//                 {({ isSubmitting, errors }) => (
//                     <Form className="form">
//                         <div className="logo">
//                             <img src="src/assets/logo/logo.png" alt="Logo" />
//                         </div>

//                         <Field type="email" name="email" placeholder="Email" />
//                         <ErrorMessage name="email" component="div" className="error-message" />

//                         <Field type="password" name="password" placeholder="Password" />
//                         <ErrorMessage name="password" component="div" className="error-message" />

//                         <button type="submit" disabled={isSubmitting}>
//                             {/* {isSubmitting ? "Logging In..." : "Log In"} */}
//                             Log In
//                         </button>
//                         {errors.login && <div className="error-message">{errors.login}</div>}
//                         <p>
//                             No Account?{" "}
//                             <Link className="link" to={"signin"}>
//                                 Create Account
//                             </Link>
//                         </p>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// }

// export default Login;




import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup
import axios from "axios";
import { ProductContext } from "../Context/ProductContext"; // Import ProductContext
import './Style.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(ProductContext); // Access the login function from context

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // Fetch users from db.json
            const response = await axios.get("http://localhost:5001/users");
            const users = response.data;

            console.log("Fetched users:", users);

            // Find user with the entered email and password
            const user = users.find((u) => u.email === values.email && u.password === values.password);

            if (user) {
                login(user.username); // Call the login function from context
                navigate("/"); // Navigate after logging in
            } else {
                setErrors({ login: "Invalid email or password" });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setErrors({ login: "Something went wrong. Please try again later." });
        }
        setSubmitting(false);
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema} // Set validation schema
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="form">
                        <div className="logo">
                            <img src="src/assets/logo/logo.png" alt="Logo" />
                        </div>

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