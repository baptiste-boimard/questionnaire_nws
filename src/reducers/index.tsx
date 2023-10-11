import { combineReducers } from 'redux';

// ==-- IMPORT SLICE--==
import modalDisplaySlice from '../slices/modalDisplay';
import utilitiesSlice from '../slices/utilities';
import authSlice from '../slices/auth';
import signupSlice from '../slices/signup';


const rootReducer = combineReducers({
  modalDisplayReducer: modalDisplaySlice,
  utilitiesReducer: utilitiesSlice,
  authReducer: authSlice,
  signupReducer: signupSlice,
});

export default rootReducer;