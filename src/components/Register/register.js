import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import './register.css';
import axios from "axios";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "username is Too Short!")
        .max(50, "username is Too Long!")
        .required("username is Required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Both passwords need to be the same"
    )
});


const submitForm = values => {
    axios
        .post("http://localhost:8080/register", values)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
};

const Register = () => {

    const showForm = ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting
                }) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group has-feedback">
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        placeholder="Username"
                        className={
                            errors.username && touched.username
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    {errors.fullname && touched.fullname ? (
                        <small id="passwordHelp" class="text-danger">
                            {errors.username}
                        </small>
                    ) : null}
                </div>
                <div className="form-group has-feedback">
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        className={
                            errors.email && touched.email
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                        placeholder="Email"
                    />
                    {errors.email && touched.email ? (
                        <small id="passwordHelp" className="text-danger">
                            {errors.email}
                        </small>
                    ) : null}
                </div>
                <div className="form-group has-feedback">
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Password"
                        className={
                            errors.password && touched.password
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    {errors.password && touched.password ? (
                        <small id="passwordHelp" className="text-danger">
                            {errors.password}
                        </small>
                    ) : null}
                </div>
                <div className="form-group has-feedback">
                    <input
                        type="password"
                        name="confirm_password"
                        onChange={handleChange}
                        className={
                            errors.confirm_password && touched.confirm_password
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                        placeholder="Confirm Password"
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                        <small id="passwordHelp" class="text-danger">
                            {errors.confirm_password}
                        </small>
                    ) : null}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary btn-block btn-flat"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        );
    };


    return (
        <div className="register-box">
            <div className="card">
                <div className="card-body register-card-body">
                    <p className="login-box-msg">Register a new membership</p>

                    <Formik
                        initialValues={{
                            fullname: "",
                            email: "",
                            password: "",
                            confirm_password: ""
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        submitForm(values);
                        setSubmitting(false);
                    }}
                        validationSchema={SignupSchema}
                        >
                        {props => showForm(props)}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;