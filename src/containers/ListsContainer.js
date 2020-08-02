import { connect } from "react-redux";

import Lists from "../components/lists/Lists";
import { removeList } from "../actions/list-actions";

const mapStateToProps = (state) => {
  return {
    lists: state.lists.ids,
  };
};

const mapDispatchToProps = {
  removeList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
