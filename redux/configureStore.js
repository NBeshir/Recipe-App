import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { Recipes } from "./recipes";
import { Comments } from "./comments";
import { Favorites } from "./favorites";

const config = {
  key: "root",
  storage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      recipes: Recipes,
      comments: Comments,
      favorites: Favorites,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
