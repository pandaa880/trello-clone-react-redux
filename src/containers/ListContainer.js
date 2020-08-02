import { connect } from "react-redux";

import List from "../components/list/List";

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.entities[ownProps.listId],
    lists: state.lists,
  };
};

export default connect(mapStateToProps)(List);
