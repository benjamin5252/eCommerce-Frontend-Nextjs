import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './user';
import productList from './productList';
import productDetails from './productDetails';
import cart from './cart';

const reducer = combineReducers({
  user, productList, productDetails, cart
})
const store = configureStore({
  reducer,
})
export default store;