import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import productReducer from "./productSlice";
import blogReducer from "./blogSlice";
import cartReducer from "./cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { blogApi } from "./blogApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
  cart: cartReducer,
 [blogApi.reducerPath]: blogApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
