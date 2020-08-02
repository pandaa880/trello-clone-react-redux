import { cards as defaultCards } from "../normalized-state";

import {
  CREATE_CARD,
  EDIT_CARD,
  REMOVE_CARD_FROM_LIST,
} from "../actions/card-actions";

const cardReducer = (cards = defaultCards, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  if (actionType === CREATE_CARD) {
    const { card, cardId } = actionPayload;
    return {
      entities: { ...cards.entities, [cardId]: card },
      ids: [...cards.ids, cardId],
    };
  }

  if (actionType === EDIT_CARD) {
    const { card, cardId } = actionPayload;
    return {
      ...cards,
      entities: { ...cards.entities, [cardId]: card },
    };
  }

  if (actionType === REMOVE_CARD_FROM_LIST) {
    const { cardId, cards } = actionPayload;

    const newCardEntities = { ...cards.entities };
    const newCardIds = [...cards.ids];
    // delete newCardEntities[cardId]

    // find the index of cardid from ids array and delete it
    const cardIndex = newCardIds.findIndex((card) => card === cardId);

    if (cardIndex >= 0) {
      newCardIds.splice(cardIndex, 1);
    }

    // delete card from the entities
    delete newCardEntities[cardId];

    // return the new state
    return {
      entities: newCardEntities,
      ids: newCardIds,
    };
  }
  return cards;
};

export default cardReducer;
