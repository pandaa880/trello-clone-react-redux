import React from "react";

// relative imports
import ListContainer from "../../containers/ListContainer";
import CreateListContainer from "../../containers/CreateListContainer";
import classes from "./lists.module.css";

function Lists({ lists = [], removeList }) {
  return (
    <section className={classes.container}>
      {lists.map((listId) => (
        <ListContainer key={listId} listId={listId} removeList={removeList} />
      ))}
      <CreateListContainer />
    </section>
  );
}

export default Lists;
