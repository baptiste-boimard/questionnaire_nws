import { combineReducers } from 'redux';

// ==-- IMPORT SLICE--==
import loginSlice from '../slices/login';


const rootReducer = combineReducers({
  loginReducer: loginSlice,
});

export default rootReducer;