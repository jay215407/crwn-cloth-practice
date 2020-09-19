import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';  //This is required for local storage.
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger] // The middleware that store is expecting from redux is in form of array.

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store); //This is required for local storage.

export default { store, persistor };