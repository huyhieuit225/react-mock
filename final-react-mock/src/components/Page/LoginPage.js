/* eslint-disable no-unused-vars */
import axios from "axios";
import { React, useState, useContext, useEffect } from "react";
import "../Styles/LoginRegisterStyle.scoped.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const register = useNavigate();
  const { setToken, setUserId } = useContext(UserContext);
  const [submitMess, setSubmitMess] = useState("");

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const getToken = () => {
    axios({
      method: "get",
      url: "https://60dff0ba6b689e001788c858.mockapi.io/token",
      body: {
        email: formValues.email,
        password: formValues.password,
      },
    }).then((response) => {
      setToken(response.data.token);
      setUserId(response.data.userId);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

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
    } else {
      getToken();
      setSubmitMess("Login successfully!");
    }
    return errors;
  };

  if (error) return <p style={{ color: "red" }}> {error}</p>;

  return (
    <div className="container-fluid" onSubmit={handleSubmit}>
      <form className="Login">
        <div className="form-inner">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              className="form-control"
              value={formValues.email}
              placeholder="Email"
              name="email"
              type="text"
              onChange={handleChange}
            />
            <span>{formErrors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              className="form-control"
              value={formValues.password}
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <span>{formErrors.password}</span>
          </div>
          <input className="loginBtn" type="submit" value="Login" />
          <input
            className="registerDirectBtn"
            type="button"
            value="Register"
            onClick={() => {
              register("/register");
            }}
          />
          <span style={{color:'#19FF8C'}}>{submitMess}</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
