import React from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Yup validation schema
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="wrapper shadow-lg">
      <div className="title">
        <span>Sign-Up Form</span>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const res = await axios.post(
              "http://localhost:8081/user",
              {
                name: values.fullName,
                email: values.email,
                password: values.confirmPassword,
              },
              {
                withCredentials: false,
              }
            );

            console.log(res);
            console.log(res.data);
            if (res) {
              alert("User Registration Successfull");
              navigate("/");
            }
            // toast.success('User Registration Successfully');
          } catch (err) {
            console.log(err.response.data.message);
            toast.warning(err.response.data.message);
            console.log(err);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <i className="bi bi-person-lines-fill"></i>
              <Field type="text" name="fullName" placeholder="Full Name" />
            </div>
            <ErrorMessage name="fullName" component="div" className="error" />

            <div className="row">
              <i className="bi bi-person-circle"></i>
              <Field type="text" name="email" placeholder="Email" />
            </div>
            <ErrorMessage name="email" component="div" className="error" />

            <div className="row">
              <i className="bi bi-lock"></i>
              <Field type="password" name="password" placeholder="Password" />
            </div>
            <ErrorMessage name="password" component="div" className="error" />

            <div className="row">
              <i className="bi bi-lock-fill"></i>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />

            <div className="row button">
              <button type="submit">Sign Up</button>
            </div>

            <div className="signup-link">
              Already a member? <Link to="/">Login now</Link>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default SignupPage;
