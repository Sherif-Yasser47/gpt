import "./RegistrationForm.css";
import { useState } from "react";
import { register, signin } from "../../api/services";
import { Navigate } from "react-router-dom";

export const RegistrationForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    apiKey: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onFormChange = (e, formKey) => {
    console.log(e.target.value);
    const newForm = {
      ...form,
      [formKey]: e.target.value,
    };

    setForm(newForm);
  };

  const saveToken = (token) => {
    console.log("token", token);
    localStorage.setItem("token", token);
  };

  const saveUser = (user) => {
    const stringifiedUser = JSON.stringify(user);
    localStorage.setItem("user", stringifiedUser);
  };

  const onRegister = () => {
    register(form)
      .then((res) => {
        const data = res.data;
        const token = data.token;
        const user = data.user;
        saveToken(token);
        saveUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setLoginError(err.response.data.error);
      });
  };

  const onLogging = () => {
    signin(form)
      .then((res) => {
        const data = res.data;
        const token = data.token;
        const user = data.user;
        saveToken(token);
        saveUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setLoginError(err.response.data.error);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/chatroom" />;
  }

  return (
    <div className="container">
      <div className="login-form">
        <div className="form-group">
          <label className="form-label">
            email:
            <input
              className="form-input"
              placeholder="Enter email"
              type="email"
              value={form.email}
              onChange={(e) => onFormChange(e, "email")}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            password
            <input
              className="form-input"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => onFormChange(e, "password")}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            openAI API Key
            <input
              className="form-input"
              placeholder="API KEY"
              type="text"
              value={form.apiKey}
              onChange={(e) => onFormChange(e, "apiKey")}
            />
          </label>
        </div>
        {loginError && <div className="error-message">Error: {loginError}</div>}
        <div className="button-container">
          <button className="login-button register" onClick={onLogging}>
            Signin
          </button>
          <button className="login-button" onClick={onRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
