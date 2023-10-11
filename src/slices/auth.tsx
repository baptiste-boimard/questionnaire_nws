import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface AuthState {
  errorMessage: string
}

// == INITIALSTATE ==
const initialState: AuthState = {
  errorMessage: '',
};
// == THUNK ==
const instance = axios.create({
  baseURL: 'http://localhost:3030',
});

/**
 * Envoi de la demande de login au back
 */
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async(user: User,
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  console.log('arrivé fetch',user);
  return await instance.post('/login', user)
  .then((response) => {
    console.log(response);
  })
});

// == SLICE ==
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrorMessageLogin: (state => {
      state.errorMessage = '';
    })
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
      })
      .addCase(fetchUser.rejected, (state, action) => {
      })
  },
});

export const { resetErrorMessageLogin } = authSlice.actions;

export default authSlice.reducer;