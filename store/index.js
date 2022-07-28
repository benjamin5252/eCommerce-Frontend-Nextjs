import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './user';
import productList from './productList';
import productDetails from './productDetails';

const reducer = combineReducers({
  user, productList, productDetails
})
const store = configureStore({
  reducer,
})
export default store;