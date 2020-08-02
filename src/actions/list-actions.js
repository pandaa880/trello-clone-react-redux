export const CREATE_LIST = "CREATE_LIST";
export const REMOVE_LIST = "REMOVE_LIST";

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

export const removeList = (listId, lists) => {
  return {
    type: REMOVE_LIST,
    payload: {
      listId,
      lists,
    },
  };
};
