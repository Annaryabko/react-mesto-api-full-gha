import React, { useState } from "react";
import {login} from '../utils/auth.js';


function Login({history, ...props}) {
  const [loginUser, setLoginUser] = useState("email@yandex.ru");
  const [password, setPassword] = useState("somepassword");


  function onSubmit(e) {
    e.preventDefault();
    
    login(loginUser, password)
      .then((token) => {
        props.onSuccess('test');
      })
      .catch(() => {
        props.onError();
      });
  }

  function handleLoginChange(e) {
    setLoginUser(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section
      className="login"
    >
      <h2 className="login__title">{props.title}</h2>
      <form
          className="popup__inputs login__inputs"
          name="login"
          onSubmit={onSubmit}
      >
      <input
        value={loginUser}
        onChange={handleLoginChange}
        className="popup__input login__input"
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={handlePasswordChange}
        className="popup__input login__input"
        type="password"
        id="password-input"
        name="password"
        placeholder="Password"
        required
      />
      <input
        className="popup__button login__button"
        type="submit"
        value={props.buttonValue}
      />
      </form>
    </section>
  );
}

export default Login;