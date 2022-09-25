import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function InfoTooltip(props) {

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
      title={props.title}
    >
      <img src={props.image} className="infoTooltip__image"></img>
    </PopupWithForm>
  );
}

export default InfoTooltip;