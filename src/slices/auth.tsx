import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface AuthState {
  email: string,
  password: string;
};

type User = {
  email: string,
  password: string
};

// == INITIALSTATE ==
const initialState: AuthState = {
  email: '',
  password: '',
};

// == THUNK ==
const instance = axios.create({
  baseURL: 'http://localhost:3030',
});

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async(user: User,
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  console.log('arrivé fetch',user);
  return await instance.post('/login', user)
  .then((response) => {
    console.log('response',response);
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