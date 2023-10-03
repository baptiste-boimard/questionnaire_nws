import { combineReducers } from 'redux';

// ==-- IMPORT SLICE--==
import loginSlice from '../slices/login';
import utilitiesSlice from '../slices/utilities';


const rootReducer = combineReducers({
  loginReducer: loginSlice,
  utilitiesReducer: utilitiesSlice,
});

export default rootReducer;