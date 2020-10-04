import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';  //This is required for local storage.
import logger from 'redux-logger';
import rootReducer from './root-reducer';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { fetchCollectionsStart } from './shop/shop.sagas';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware] // The middleware that store is expecting from redux is in form of array.

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);  //here we will pass each individual sagas

export const persistor = persistStore(store); //This is required for local storage.

export default { store, persistor };