import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id; //true or false

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "elements__delete_visible" : "elements__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked ? "elements__like_visible" : "elements__like_hidden"
  }`;

  return (
    <li className="elements__item">
      <img
        className="elements__picture"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <button
        className={"elements__delete " + cardDeleteButtonClassName}
        type="button"
        value="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="elements__wrapper">
        <h2 className="elements__item-name">{card.name}</h2>
        <div className="elements__like-wrapper">
          <button
            className={"elements__like " + cardLikeButtonClassName}
            type="button"
            value="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;