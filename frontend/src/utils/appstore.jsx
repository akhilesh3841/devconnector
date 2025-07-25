import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage"; // ✅ Import storage
import feedReducer from "./feedslice"
import connectionreducer from "./connectionslice"
import requestreducer from "./requestslice"
import themereducer from "./themeslice"
const persistConfig = {
    key: "root",
    version: 1,
    storage, // ✅ Use storage here
};

// ✅ Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    feed: feedReducer, 
    connection:connectionreducer,
    request:requestreducer,
    theme:themereducer, // ✅ Add theme reducer here
});

// ✅ Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ Ignore non-serializable warnings for redux-persist
        }),
});

// ✅ Create persistor
const persistor = persistStore(appStore);

export { appStore, persistor };
