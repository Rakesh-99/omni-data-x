import { configureStore, combineReducers } from '@reduxjs/toolkit';
import teacherSlice from '../features/teacherSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";



// Perisist config : 
const persistConfig = {
    version: 1,
    key: "root",
    storage
}


// Root Reducers : 
const rootReducer = combineReducers({
    teacherslice: teacherSlice,
});

// Persisted reducer : 
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
export const persistor = persistStore(store);
export default store;