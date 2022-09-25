import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    if (currentUser && currentUser.name) {
      setName(currentUser.name);
    }
    if (currentUser && currentUser.about) {
      setDescription(currentUser.about);
    }
  }, [currentUser.name, currentUser.about, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popup_edit"
      title="Редактировать профиль"
      buttonValue="Сохранить"
    >
      <input
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        type="text"
        id="name-input"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        value={description}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_description"
        type="text"
        id="description-input"
        name="about"
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;