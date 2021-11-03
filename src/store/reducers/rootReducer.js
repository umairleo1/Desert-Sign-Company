import {combineReducers} from 'redux';
import cartReducer from './cart';
import savedItem from './savedItem';
const rootReducer = combineReducers({
  cart: cartReducer,
  savedItem: savedItem,
});

export default rootReducer;
