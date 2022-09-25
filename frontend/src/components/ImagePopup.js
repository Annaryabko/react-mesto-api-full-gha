import React from "react";

function ImagePopup(props) {
  function popupClose() {
    props.onClose();
  }

  return (
    <section
      className={`popup popup_photo ${props.isOpen ? "popup__opened" : ""}`}
    >
      <div className="popup__container popup__container_photo">
        <button
          type="button"
          className="popup__close"
          value="Закрыть"
          onClick={popupClose}
        ></button>
        <img
          className="popup__picture"
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
        />
        <p className="popup__description">{props.card && props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
