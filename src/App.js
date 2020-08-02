import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import ListsContainer from "./containers/ListsContainer";
import { sort } from "./actions/list-actions";

function App() {
  const dispatch = useDispatch();

  // handle card drag event
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main>
        <ListsContainer />
      </main>
    </DragDropContext>
  );
}

export default App;
