import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Footer from "./Footer.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  handleCards,
  onCardLike,
  onCardDelete,
}) {
  function editProfile() {
    onEditProfile();
  }

  function addPlace() {
    onAddPlace();
  }

  function editAvatar() {
    onEditAvatar();
  }

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <div className="profile__avatar-edit" onClick={editAvatar}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__header">{currentUser.name}</h1>
          <div className="profile__edit-wrapper">
            <button
              className="profile__edit-button"
              type="button"
              value="Отредактировать"
              onClick={editProfile}
            ></button>
          </div>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          value="Добавить"
          onClick={addPlace}
        >
          +
        </button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              ></Card>
            );
          })}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default Main;
