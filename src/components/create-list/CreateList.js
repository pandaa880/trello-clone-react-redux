import React, { useState } from "react";

import classes from "./create-list.module.css";

function CreateList({ createList }) {
  const [title, setTitle] = useState("");

  const isValid = () => {
    return !!title;
  };

  const isInvalid = () => {
    return !isValid();
  };

  // form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    if (createList) {
      createList({
        title,
      });
    }

    setTitle("");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        className={classes.formInput}
        id="CreateList-title"
        name="title"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter list title"
        value={title}
      />
      <input
        className={classes.formSubmit}
        type="submit"
        value="Add List"
        disabled={isInvalid()}
      />
    </form>
  );
}

export default CreateList;
