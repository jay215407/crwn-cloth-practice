import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; //This is required for local storage.
import storage  from 'redux-persist/lib/storage'; //This is required for local storage.
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = { //This is required for local storage.
    key: 'root', // We want to store from root
    storage,  // storage key goes to whatever storage object from redux persist.
    whitelist: ['cart']  //This specifies which reducer to used for local storage.
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);


//Below config is before we used local persist in our app.

// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// })