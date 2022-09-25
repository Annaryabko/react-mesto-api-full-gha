import React from "react";
function PopupWithForm(props) {
  function popupClose() {
    props.onClose();
  }

  return (
    <section
      className={`popup ${props.name} ${props.isOpen ? "popup__opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          value="Закрыть"
          onClick={popupClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__inputs"
          name={`${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <input
            className="popup__button"
            type="submit"
            value={props.buttonValue}
          />
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
