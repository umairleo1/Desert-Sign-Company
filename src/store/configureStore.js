import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
// import {getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [...getDefaultMiddleware()],
// });
// export default store;

const persistConfig = {
  key: 'root',
  keyPrefix: '',
  storage: AsyncStorage,
  //   whitelist: ["printer", "customer", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  });
  const persistor = persistStore(store);
  return {store, persistor};
};

// import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from './reducer';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
