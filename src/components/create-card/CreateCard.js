import React, { useState } from "react";
import { MdClose } from "react-icons/md";

import useToggle from "../../hooks/useToggle";
import classes from "./create-card.module.css";

function CreateCard({ createCard, listId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formToggle = useToggle();

  const isValid = () => {
    return title && description;
  };

  const isInvalid = () => {
    return !isValid();
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isInvalid()) return;

    if (createCard) {
      createCard(listId, {
        title,
        description,
      });
    }

    setTitle("");
    setDescription("");
  };

  const renderForm = () => (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        className={classes.titleInput}
        onChange={(event) => setTitle(event.target.value)}
        name="title"
        placeholder="Title"
        type="text"
        value={title}
      />
      <textarea
        rows={5}
        className={classes.descriptionInput}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        name="description"
        type="text"
        value={description}
      />
      <div className={classes.formActionBtnContainer}>
        <input
          className={classes.formSubmitBtn}
          type="submit"
          value="Create New Card"
          disabled={isInvalid()}
        />
        <button className={classes.formCancelBtn} onClick={formToggle.toggle}>
          <MdClose className={classes.formCancelBtnIcon} />
        </button>
      </div>
    </form>
  );

  const renderFormToggler = () => (
    <div className={classes.btnContainer}>
      <button
        type="button"
        onClick={formToggle.toggle}
        className={classes.toggleBtn}
      >
        + Add Another Card
      </button>
    </div>
  );
  return formToggle.on ? renderForm() : renderFormToggler();
}

export default CreateCard;
