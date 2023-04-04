import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as LoginReducer } from "./LoginReducer/reducer";
import { userReducer } from "./UserReducer/reducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ LoginReducer, userReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { persistor, store };
