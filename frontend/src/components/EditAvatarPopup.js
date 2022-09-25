import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popup_avatar"
      title="Обновить аватар?"
      buttonValue="Сохранить"
    >
      <input
        ref={avatarRef}
        className="popup__input popup__input_type_link"
        type="url"
        id="avatar-input"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
