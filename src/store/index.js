import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import catReducer from "./reducers/cat-reducer";

const persistedCatReducer = persistReducer(
  {
    key: "CAT",
    storage,
  },
  catReducer
);

const store = configureStore({
  reducer: persistedCatReducer,
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default store;
export { persistor };
