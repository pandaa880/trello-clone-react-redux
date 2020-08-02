import { connect } from "react-redux";

import Card from "../components/card/Card";

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards.entities[ownProps.cardId],
    lists: state.lists,
    cards: state.cards,
  };
};

export default connect(mapStateToProps)(Card);
