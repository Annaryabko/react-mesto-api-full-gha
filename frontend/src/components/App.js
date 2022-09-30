import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import { Route, Switch, useRouteMatch, BrowserRouter, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute.js";
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

function App({match, location, history}) {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isToolTipSuccessPopupOpen, setisToolTipSuccessPopupOpen] = useState(false);
  const [isToolTipErrorPopupOpen, setisToolTipErrorPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const url = process.env.REACT_APP_ROUTE_PREFIX || '';

  useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', false);
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        handleCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editProfile() {
    setisEditProfilePopupOpen(true);
  }

  function addPlace() {
    setisAddPlacePopupOpen(true);
  }

  function editAvatar() {
    setisEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setisToolTipSuccessPopupOpen(false);
    setisToolTipErrorPopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .editName(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCards(data) {
    setCards(data);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegisterSuccess() {
    setisToolTipSuccessPopupOpen(true);
    history.push(`${url}/sign-in`);
  }

  function onLoginSuccess() {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', true);
    history.push(`${url}/`);
  }

  function onError() {
    setisToolTipErrorPopupOpen(true);
  }

  function onLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    localStorage.setItem('loggedIn', false);
    history.push(`${url}/sign-in`);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <ImagePopup
          card={selectedCard}
          isOpen={!!selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />
          <Header onLogout={onLogout} email={currentUser.email} pathname={url} />

          <Switch>
            <Route exact path={`${url}/sign-up`}>
              <Register
                title="Регистрация"
                buttonValue="Зарегистрироваться"
                onSuccess={onRegisterSuccess}
                onError={onError}
              />
            </Route>
            <Route path={`${url}/sign-in`}>
              <Login
                title="Вход"
                buttonValue="Войти"
                onSuccess={onLoginSuccess}
                onError={onError}
              />
            </Route>

            <ProtectedRoute
              path={`${url}/`}
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={editProfile}
              onAddPlace={addPlace}
              onEditAvatar={editAvatar}
              onCardClick={handleCardClick}
              cards={cards}
              handleCards={handleCards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>


          <InfoTooltip
            isOpen={isToolTipSuccessPopupOpen}
            onClose={closeAllPopups}
            name="popup__infoToolTip popup__infoToolTip_success"
            title="Вы успешно зарегистрировались!"
            image={successIcon}
          />

          <InfoTooltip
            isOpen={isToolTipErrorPopupOpen}
            onClose={closeAllPopups}
            name="popup__infoToolTip popup__infoToolTip_error"
            title="Что-то пошло не так! Попробуйте ещё раз."
            image={errorIcon}
          />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);