import { combineReducers } from 'redux';

// ==-- IMPORT SLICE--==
import loginSlice from '../slices/login';
import utilitiesSlice from '../slices/utilities';
import authSlice from '../slices/auth';


const rootReducer = combineReducers({
  loginReducer: loginSlice,
  utilitiesReducer: utilitiesSlice,
  authReducer: authSlice,
});

export default rootReducer;