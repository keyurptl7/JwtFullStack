import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";

function Signup() {
  const [signupParam, setLoginParam] = useState({
    name: "",
    about: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginValidation = () => {
    setFormError("");
    setNameError("");
    setAboutError("");
    setEmailError("");
    setPasswordError("");

    if (signupParam.name === "") {
      setNameError("Please enter your name.");
      return false;
    }
    if (signupParam.email === "") {
      setEmailError("Please enter your email.");
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(signupParam.email)) {
      setEmailError("Please enter a valid email.");
      return false;
    }
    if (signupParam.password === "") {
      setPasswordError("Please enter a password.");
      return false;
    }
    if (signupParam.password.length < 7) {
      setPasswordError("The password must be 8 characters or longer.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    // console.log(loginParam);
    if (!loginValidation()) {
      return;
    }
    axios
      .post("http://localhost:8080/auth/signup", signupParam)
      .then((response) => {
        //get token from response
        // console.log(response);
        if (!response.data.success) {
          setFormError(response.data.message);
          return false;
        }

        const token = response.data.data.jwtToken;
        //set JWT token to local
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data.data.username);

        //set token to common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;
    setLoginParam((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Signup</div>
      </div>
      <br />
      <div className="inputContainer">
        <label className="errorLabel">{formError}</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter your name here"
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="text"
          name="about"
          placeholder="What's about you."
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{aboutError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="email"
          name="email"
          placeholder="Enter your email here"
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          name="password"
          placeholder="Enter your password here"
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          className="inputButton"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          value="Signup"
        />
        <a href="/login" className="aLink">
        Login
        </a>
      </div>
    </div>
  );
}
export default Signup;
