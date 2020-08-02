import { schema, normalize } from "normalizr";
import defaultState from "./default-state.json";

const card = new schema.Entity("cards");
const list = new schema.Entity("lists", {
  cards: [card],
});

const normalizedLists = normalize(defaultState.lists, [list]);

export const lists = {
  entities: normalizedLists.entities.lists,
  ids: normalizedLists.result,
};

export const cards = {
  entities: normalizedLists.entities.cards,
  ids: Object.keys(normalizedLists.entities.cards),
};

export default {
  lists,
  cards,
};
