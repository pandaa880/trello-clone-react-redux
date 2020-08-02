import React from "react";

import ListsContainer from "../../containers/ListsContainer";
import classes from "./board.module.css";

function Board() {
  return (
    <div className={classes.board}>
      <h1 className={classes.board__title}>Kubric UI</h1>
      <ListsContainer />
    </div>
  );
}

export default Board;
