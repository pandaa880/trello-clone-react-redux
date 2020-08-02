import { connect } from "react-redux";

import { editListTitle } from "../actions/list-actions";
import List from "../components/list/List";

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.entities[ownProps.listId],
    lists: state.lists,
  };
};

const mapDispatchToProps = {
  editListTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
