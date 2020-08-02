// initial state
import { lists as defaultLists } from "../normalized-state";

import { CREATE_LIST, REMOVE_LIST } from "../actions/list-actions";
import {
  CREATE_CARD,
  MOVE_CARD_TO_LIST,
  REMOVE_CARD_FROM_LIST,
} from "../actions/card-actions";

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

  return lists;
};

export default listReducer;
