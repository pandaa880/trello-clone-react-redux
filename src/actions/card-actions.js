export const CREATE_CARD = "CREATE_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const MOVE_CARD_TO_LIST = "MOVE_CARD";
export const REMOVE_CARD_FROM_LIST = "REMOVE_CARD";

const defaultCardData = {
  title: "",
  description: "",
};

export const createCard = (listId, cardData) => {
  const cardId = Date.now().toString();

  const card = {
    id: cardId,
    ...defaultCardData,
    ...cardData,
  };

  return {
    type: CREATE_CARD,
    payload: {
      card,
      listId,
      cardId,
    },
  };
};

export const editCard = (cardData, cardText) => {
  const newCardData = {
    ...cardData,
    title: cardText.title,
    description: cardText.description,
  };

  return {
    type: EDIT_CARD,
    payload: {
      card: newCardData,
      cardId: newCardData.id,
    },
  };
};

export const removeCardFromList = (cardId, listId, lists, cards) => {
  return {
    type: REMOVE_CARD_FROM_LIST,
    payload: {
      cardId,
      listId,
      lists,
      cards,
    },
  };
};
