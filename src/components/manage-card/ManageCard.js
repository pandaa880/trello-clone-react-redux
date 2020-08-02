import React, { useState } from "react";

// actions
import { editCard } from "../../actions/card-actions";

import classes from "./manage-card.module.css";

function ManageCard({ dispatch, card, toggleModal }) {
  const [cardTitle, setCardTitle] = useState(card.title);
  const [cardText, setCardText] = useState(card.description);

  const isValid = () => {
    return cardTitle && cardText;
  };

  const isInvalid = () => {
    return !isValid();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalid()) return;
    dispatch(editCard(card, { title: cardTitle, description: cardText }));
    toggleModal();
  };

  return (
    <div className={classes.wrapper}>
      {/* <h3 className={classes.title}>Manage Card</h3> */}
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="card__title">Title</label>
          <input
            type="text"
            name="card-title"
            id="card__title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            className={classes.formInput}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="card__description">Description</label>
          <textarea
            rows={5}
            value={cardText}
            onChange={(e) => setCardText(e.target.value)}
            className={classes.formTextArea}
            name="card-description"
            id="card__description"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={classes.formSubmitBtn}
          disabled={isInvalid()}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ManageCard;
