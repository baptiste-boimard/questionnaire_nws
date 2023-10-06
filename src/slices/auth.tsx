import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface AuthState {

}

// == INITIALSTATE ==
const initialState: AuthState = {

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

// export const { } = authSlice.actions;

export default authSlice.reducer;