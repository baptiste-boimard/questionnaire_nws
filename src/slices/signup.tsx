import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface SignupState {
  email: string,
  password: string,
  errorMessage: string,
  errorColor: boolean,
  verifiedEmail: boolean,
  retryEmail: boolean,
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
    console.log(response);
    
    return fulfillWithValue(response.data)
  })
  .catch((error) => {    
    return rejectWithValue(error.response.data.error);
  })
});

/**
 * Demande d'envoi d'un nouvel email
 */
export const newEmailToken = createAsyncThunk(
  'sign/newEmailToken',
  async(user: User, 
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  return await instance.post('/new-email-validation', user)
  .then((response) => {
    console.log(response.data);    
    const ss:any = getState();
    console.log('USER', ss.signupReducer);
    
    // dispatch(signupUser(user))
    return fulfillWithValue(response.data);
  })
  .catch((error) => {
    console.log(error);
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
      .addCase(signupUser.pending, (state, action) => {
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.errorMessage = 'Un email de vérification viens de vous être envoyé';
        state.errorColor = true;
      })
      .addCase(signupUser.rejected, (state, action: any) => {
        state.errorMessage = action.payload;
        state.errorColor = false;
        state.retryEmail = true;
      })
      .addCase(newEmailToken.fulfilled, (state, action) => {
        state.errorMessage = 'Un email de vérification viens de vous être envoyé';
        state.errorColor = true;
      })
      .addCase(newEmailToken.rejected, (state) => {
        state.errorMessage = 'Une erreur est survenue, réessayez';
        state.errorColor = false;
        state.retryEmail = true;
      })
  },
});

export const { resetErrorMessageSignup } = signupSlice.actions;

export default signupSlice.reducer;