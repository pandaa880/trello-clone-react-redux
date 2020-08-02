import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

import ManageCard from "../manage-card/ManageCard";
import Modal from "../modal/Modal";
import useToggle from "../../hooks/useToggle";
import { removeCardFromList } from "../../actions/card-actions";

import classes from "./card.module.css";

function Card({
  card = {},
  cardId,
  cardIndex,
  listId,
  lists,
  cards,
  dispatch,
}) {
  const manageCardModal = useToggle();

  const handleDeleteCard = () => {
    dispatch(removeCardFromList(card.id, listId, lists, cards));
    manageCardModal.toggle();
  };

  return (
    <Draggable draggableId={String(cardId)} index={cardIndex}>
      {(provided) => (
        <div
          className={classes.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={classes.card__header}>
            <h2 className={classes.card__title}>{card.title}</h2>
            <div className={classes.card__manageBtnGroup}>
              <button
                type="button"
                className={classes.card__manageBtn}
                onClick={manageCardModal.toggle}
              >
                <MdModeEdit className={classes.card__manageBtn__icon} />
              </button>
              <button
                type="button"
                className={classes.card__manageBtn}
                onClick={handleDeleteCard}
              >
                <MdDelete className={classes.card__manageBtn__icon} />
              </button>
            </div>
          </div>
          <p className={classes.card__text}>{card.description}</p>

          {/* Manage Card Popup */}
          <Modal
            on={manageCardModal.on}
            toggle={manageCardModal.toggle}
            title="Manage Card"
          >
            <ManageCard
              dispatch={dispatch}
              card={card}
              toggleModal={manageCardModal.toggle}
            />
          </Modal>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
