/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginRegisterStyle.scoped.css";

export default function Register() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const homeDirection = useNavigate();
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  //const success = useNavigate();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must have more than 8 character!";
    }
    return errors;
  };

  return (
    <div className="container-fluid">
      <form className="Register" onSubmit={handleSubmit}>
        <div className="form-inner">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="text-center text-success fw-bold">
              Signed up successfully
            </div>
          ) : (
            <pre></pre>
          )}
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={formValues.username}
              onChange={handleChange}
            ></input>
            <span>{formErrors.username}</span>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
            ></input>
            <span>{formErrors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            ></input>
            <span>{formErrors.password}</span>
          </div>
          <input className="registerBtn" type="submit" value="Register" />
          <input
            className="homeBtn"
            type="button"
            value="Back"
            onClick={() => {
              homeDirection("/home");
            }}
          />
        </div>
      </form>
    </div>
  );
}
