import {combineReducers} from 'redux';
import homeReducer from '../container/reducer';

export const combinedReducers = combineReducers({
  home: homeReducer,
});
