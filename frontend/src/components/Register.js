import React from "react";
import {register} from '../utils/auth.js';
import { Route, Switch, Link } from 'react-router-dom';

function Register(props) {
  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  function onSubmit(e) {
    e.preventDefault();
    register(loginRef.current.value, passwordRef.current.value)
      .then(() => {
        props.onSuccess();
      })
      .catch(() => {
        props.onError();
      });
  }

  return (
    <section
      className="login register"
    >
      <h2 className="login__title">{props.title}</h2>
      <form
          className="popup__inputs login__inputs"
          name="login"
          onSubmit={onSubmit}
      >
      <input
        ref={loginRef}
        className="popup__input login__input"
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        required
      />
      <input
        ref={passwordRef}
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
      <div>Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link></div>
    </section>
  );
}

export default Register;