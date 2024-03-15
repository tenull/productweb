import { combineReducers, configureStore } from '@reduxjs/toolkit';
import '../index.css';
import product from './slices/product';
import cart from './slices/cart';
import user from './slices/user';
import order from './slices/order';
import admin from './slices/admin';
import search from './slices/search';
const reducer = combineReducers({
	product,
	cart,
	user,
	order,
	admin,
	search
});

export default configureStore({ reducer });