export const CREATE_LIST = "CREATE_LIST";
export const EDIT_LIST_TITLE = "EDIT_LIST_TITLE";
export const REMOVE_LIST = "REMOVE_LIST";
export const DRAG_HAPPENED = "DRAG_HAPPENED";

// list reducer - create list function
const defaultListData = {
  title: "",
  cards: [],
};

export const createList = (listData) => {
  const listId = Date.now().toString();

  const list = {
    id: listId,
    ...defaultListData,
    ...listData,
  };

  return {
    type: CREATE_LIST,
    payload: {
      listId,
      list,
    },
  };
};

export const editListTitle = (listId, newTitle) => {
  return {
    type: EDIT_LIST_TITLE,
    payload: {
      listId,
      newTitle,
    },
  };
};

export const removeList = (listId, lists) => {
  return {
    type: REMOVE_LIST,
    payload: {
      listId,
      lists,
    },
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return {
    type: DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    },
  };
};
