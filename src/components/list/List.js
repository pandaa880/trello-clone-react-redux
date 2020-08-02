import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";

import CardContainer from "../../containers/CardContainer";
import CreateCardContainer from "../../containers/CreateCardContainer";

import classes from "./list.module.css";

function List({ list = {}, listId, lists, removeList }) {
  const handleDeleteList = () => {
    removeList(listId, lists);
  };
  return (
    <article className={classes.wrapper}>
      <div className={classes.list__content}>
        <div className={classes.list__header}>
          <h2 className={classes.list__title}>{list.title}</h2>
          <button
            type="button"
            className={classes.list__manageBtn}
            onClick={handleDeleteList}
          >
            <MdDelete className={classes.list__manageBtn__icon} />
          </button>
        </div>
        <div className={classes.list__cards}>
          {list.cards.map((cardId) => (
            <CardContainer key={cardId} cardId={cardId} listId={listId} />
          ))}
        </div>
        <div className={classes.list__composerContainer}>
          <CreateCardContainer listId={list.id} />
        </div>
      </div>
    </article>
  );
}

export default List;
