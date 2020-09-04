import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger] // The middleware that store is expecting from redux is in form of array.

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;