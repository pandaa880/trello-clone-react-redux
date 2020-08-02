// initial state
import { lists as defaultLists } from "../normalized-state";

import {
  CREATE_LIST,
  EDIT_LIST_TITLE,
  REMOVE_LIST,
  DRAG_HAPPENED,
} from "../actions/list-actions";
import { CREATE_CARD, REMOVE_CARD_FROM_LIST } from "../actions/card-actions";

const listReducer = (lists = defaultLists, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  if (actionType === CREATE_LIST) {
    const { listId, list } = actionPayload;
    const newListsEntities = { ...lists.entities, [listId]: list };
    const newListsIds = [...lists.ids, listId];

    return {
      entities: newListsEntities,
      ids: newListsIds,
    };
  }

  if (actionType === EDIT_LIST_TITLE) {
    const { listId, newTitle } = actionPayload;
    const newList = { ...lists.entities[listId], title: newTitle };
    return {
      entities: { ...lists.entities, [listId]: newList },
      ids: lists.ids,
    };
  }

  // remove list
  if (actionType === REMOVE_LIST) {
    const { listId, lists } = actionPayload;

    const newEntities = { ...lists.entities };
    const newIds = [...lists.ids];

    // delete the list using listId
    delete newEntities[listId];

    // find the list id from array of ids using listId from param
    const listIdIndex = newIds.findIndex((id) => id === listId);

    if (listIdIndex >= 0) {
      newIds.splice(listIdIndex, 1);
    }

    return {
      entities: newEntities,
      ids: newIds,
    };
  }

  if (actionType === CREATE_CARD) {
    const { cardId, listId } = actionPayload;
    // create new array of cards
    const cards = lists.entities[listId].cards.concat(cardId);
    // update the lists entities
    const newEntities = { ...lists.entities };
    // update cards for new entities
    newEntities[listId].cards = cards;
    // new state
    return {
      ...lists,
      entities: newEntities,
    };
  }

  /**
   * remove card from list
   */
  if (actionType === REMOVE_CARD_FROM_LIST) {
    const { listId, lists, cardId } = actionPayload;

    // make a copy of lists entities and ids
    const updatedListOfCards = [...lists.entities[listId].cards];

    // find the list and remove card reference from that list
    const cardIndexInList = updatedListOfCards.findIndex((id) => id === cardId);

    if (cardIndexInList >= 0) {
      updatedListOfCards.splice(cardIndexInList, 1);
    }

    // define new card entities
    const updatedList = {
      ...lists.entities[listId],
      cards: updatedListOfCards,
    };

    // return updated data
    return {
      entities: { ...lists.entities, [listId]: updatedList },
      ids: lists.ids,
    };
  }

  // drag
  if (actionType === DRAG_HAPPENED) {
    const {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    } = actionPayload;

    // card drops in same list
    if (droppableIdStart === droppableIdEnd) {
      const updatedCards = [...lists.entities[droppableIdStart].cards];
      // swap the order of cards based on index
      [updatedCards[droppableIndexStart], updatedCards[droppableIndexEnd]] = [
        updatedCards[droppableIndexEnd],
        updatedCards[droppableIndexStart],
      ];
      // update list
      const updatedList = {
        ...lists.entities[droppableIdStart],
        cards: updatedCards,
      };

      return {
        entities: { ...lists.entities, [droppableIdStart]: updatedList },
        ids: lists.ids,
      };
    }

    // card drops in different list
    if (droppableIdStart !== droppableIdEnd) {
      // find the list where drag started
      const listStart = lists.entities[droppableIdStart];
      // find the list where drag ended
      const listEnd = lists.entities[droppableIdEnd];
      // take out the card from the start list
      const card = listStart.cards.splice(droppableIndexStart, 1);
      // update the endList with new card
      listEnd.cards.splice(droppableIndexEnd, 0, card);

      return {
        entities: {
          ...lists.entities,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd,
        },
        ids: lists.ids,
      };
    }
  }

  return lists;
};

export default listReducer;
