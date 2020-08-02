import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Droppable } from "react-beautiful-dnd";

import useToggle from "../../hooks/useToggle";
import CardContainer from "../../containers/CardContainer";
import CreateCardContainer from "../../containers/CreateCardContainer";

import classes from "./list.module.css";

function List({ list = {}, listId, lists, removeList, editListTitle }) {
  const [listTitle, setListTitle] = useState(list.title);
  const listTitleInputToggle = useToggle();
  const handleDeleteList = () => {
    removeList(listId, lists);
  };

  const handleListTitleChange = () => {
    editListTitle(listId, listTitle);
    listTitleInputToggle.toggle();
  };

  return (
    <Droppable droppableId={String(listId)}>
      {(provided) => (
        <article
          className={classes.wrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={classes.list__content}>
            <div className={classes.list__header}>
              {listTitleInputToggle.on ? (
                <input
                  type="text"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  onBlur={handleListTitleChange}
                  className={classes.list__titleInput}
                />
              ) : (
                <h2
                  className={classes.list__title}
                  onDoubleClick={listTitleInputToggle.toggle}
                >
                  {listTitle}
                </h2>
              )}

              <button
                type="button"
                className={classes.list__manageBtn}
                onClick={handleDeleteList}
              >
                <MdDelete className={classes.list__manageBtn__icon} />
              </button>
            </div>
            <div className={classes.list__cards}>
              {list.cards.map((cardId, index) => (
                <CardContainer
                  key={cardId}
                  cardId={cardId}
                  cardIndex={index}
                  listId={listId}
                />
              ))}
              {provided.placeholder}
            </div>
            <div className={classes.list__composerContainer}>
              <CreateCardContainer listId={list.id} />
            </div>
          </div>
        </article>
      )}
    </Droppable>
  );
}

export default List;
