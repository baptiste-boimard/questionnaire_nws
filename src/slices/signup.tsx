import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface SignupState {
  email: string,
  password: string,
  errorMessage: string,
  errorColor: boolean,
  verifiedEmail: boolean,
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
};

// == THUNK ==
const instance = axios.create({
  baseURL: 'http://localhost:3030',
});
/**
 * Demande d'inscription envoyé au back
 */
export const signupUser = createAsyncThunk(
  'auth/signupUser',
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
  'auth/returnEmailToken',
  async(emailToken: EmailToken,
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  return await instance.post('/return-email-validation', emailToken)
  .then((response) => {
    return fulfillWithValue(response.data)
  })
  .catch((error) => {
    return rejectWithValue(error.response.data.error);
  })
  }
)

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
        
      })
  },
});

export const { resetErrorMessageSignup } = signupSlice.actions;

export default signupSlice.reducer;