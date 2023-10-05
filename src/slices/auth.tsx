import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030',
});

const initialState = {
  email: '',
  password: '',
};

type User = {
  email: string,
  password: string
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async({email, password}, {rejectWithValue}) => {
  console.log('arrivé fetch',email, password);
  
  return await instance.post('/login', {
    email,
    password,
  })
  .then((response) => {
    console.log(response);
  })
});

// export const fetchUser = createAsyncThunk ('login/fetchUser', async (initialState),
//   {rejectWithValue}) => {
//     return await instance.post('/login', {
//       email,
//       password,
//     })
//     .then((response) => {
//       console.log(response);
      
//     })
//   });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserToState: (state, action) => {
      console.log('arrive payload',action.payload);
      state.email = action.payload.email;
      state.password = action.payload.password;      
    }
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

export const { addUserToState } = authSlice.actions;

export default authSlice.reducer;