import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface SignupState {
  email: string,
  password: string;
};

type EmailToken = {
  emailToken: string
};

// == INITIALSTATE ==
const initialState: SignupState = {
  email: '',
  password: '',
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
    console.log(response);
  })
  .catch((error) => {
    console.log(error.response.data.error.message,'message');
    console.log(error.response.request.status, 'status');
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
    console.log(response.data);
  })
  .catch((error) => {
    // console.log(error, 'retour slice');
    return rejectWithValue(error.response.data.error);
  })
  }
)

// == SLICE ==
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(signupUser.pending, (state, action) => {
      })
      .addCase(signupUser.fulfilled, (state, action) => {
      })
      .addCase(signupUser.rejected, (state, action) => {
      })
  },
});


export default signupSlice.reducer;