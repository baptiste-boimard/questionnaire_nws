import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { closeModal } from './modalDisplay';

// == INTERFACE ET TYPE ==
interface SignupState {
  email: string,
  password: string,
  errorMessage: string,
  errorColor: boolean,
  verifiedEmail: boolean,
  retryEmail: boolean,
  spinner: boolean,
};

type EmailToken = {
  emailToken: string
};

// == INITIALSTATE ==
const initialState: SignupState = {
  email: '',
  password: '',
  errorMessage: '',
  errorColor: false,
  verifiedEmail: false,
  retryEmail: false,
  spinner: false,
};

// == THUNK ==
const instance = axios.create({
  baseURL: 'http://localhost:3030',
}); 

/**
 * Demande d'inscription envoyé au back
 */
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async(user: User,
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  return await instance.post('/signup', user)
  .then((response) => {
    return fulfillWithValue(response.data);
  })
  .catch((error) => {
    return rejectWithValue(error.response.data.error.message);

  })
});
/**
 * Envoi au back la vérifiaction de l'emailToken reçu
 */
export const returnEmailToken = createAsyncThunk(
  'signup/returnEmailToken',
  async(emailToken: EmailToken,
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  return await instance.post('/return-email-validation', emailToken)
  .then((response) => {    
    return fulfillWithValue(response.data)
  })
  .catch((error) => {    
    return rejectWithValue(error.response.data.error);
  })
});

/**
 * Demande d'envoi d'un nouvel email
 */
export const newEmail = createAsyncThunk(
  'sign/newEmailToken',
  async(user: User, 
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  return await instance.post('/new-email-validation', user)
  .then((response) => {
    return fulfillWithValue(response.data);
  })
  .catch((error) => {    
    return rejectWithValue(error.response.data.error.message)
  })
});

// == SLICE ==
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetErrorMessageSignup: (state) => {
      state.errorMessage = '';
      state.errorColor = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signupUser.pending, (state) => {
        state.spinner = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.spinner = false;
        state.errorMessage = 'Un email de vérification viens de vous être envoyé';
        state.errorColor = true;
      })
      .addCase(signupUser.rejected, (state, action: any) => {
        state.spinner = false;
        if(action.payload === 'Vous devez terminer l\'étape de vérification, vérifié vos emails') {          
          state.retryEmail = true;
        };
        state.errorMessage = action.payload;
        state.errorColor = false;
      })
      .addCase(newEmail.pending, (state) => {
        state.spinner = true;
      })
      .addCase(newEmail.fulfilled, (state) => {
        state.spinner = false;
        state.errorMessage = 'Un email de vérification viens de vous être envoyé';
        state.errorColor = true;
      })
      .addCase(newEmail.rejected, (state, action: any) => {
        state.spinner = false;
        if (action.payload === 'Cet utilisateur n\'est pas inscrit, veuillez valider l\'inscription') {
          state.retryEmail = false;
        }
        state.errorMessage = action.payload;
        state.errorColor = false;
      })
      .addCase(closeModal, (state) => {        
        state.verifiedEmail = false;
      })
  },
});

export const { resetErrorMessageSignup } = signupSlice.actions;

export default signupSlice.reducer;