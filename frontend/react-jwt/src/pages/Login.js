import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";

function Login() {
  const [loginParam, setLoginParam] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginValidation = () => {
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if (loginParam.email === "") {
      setEmailError("Please enter your email");
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginParam.email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    if (loginParam.password === "") {
      setPasswordError("Please enter a password");
      return false;
    }
    if (loginParam.password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    // console.log(loginParam);
    console.log(loginValidation());
    if (!loginValidation()) {
      return;
    }
    axios
      .post("http://localhost:8080/auth/login", loginParam)
      .then((response) => {
        //get token from response
        const token = response.data.jwtToken;

        //set JWT token to local
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data.username);

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
        <div>Login</div>
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
          value="Log in"
        />
      </div>
    </div>
  );
}
export default Login;
