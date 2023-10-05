import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030',
});

const initialState = {
  email: '',
  password: '',
};

export const fetchUser = createAsyncThunk ('login/fetchUser', async ({email, password},
  {rejectWithValue}) => {
    return await instance.post('/login', {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      
    })
  });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers(builder) {

  },
});

export default authSlice.reducer;