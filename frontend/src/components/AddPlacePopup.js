import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateCards({
      name: cardName,
      link: cardLink,
    });
  }

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [props.isOpen]);


  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popup_add"
      title="Новое место"
      buttonValue="Сохранить"
    >
      <input
        value={cardName}
        onChange={handleCardNameChange}
        className="popup__input popup__input_type_title"
        type="text"
        id="title-input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error title-input-error"></span>

      <input
        value={cardLink}
        onChange={handleCardLinkChange}
        className="popup__input popup__input_type_link"
        type="url"
        id="link-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
