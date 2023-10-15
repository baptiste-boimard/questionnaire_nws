import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// == INTERFACE ET TYPE ==
interface AuthState {
  errorMessageLogin: string
  errorColorLogin: boolean,
  spinnerLogin: boolean,
  isLogin: boolean,
}

// == INITIALSTATE ==
const initialState: AuthState = {
  errorMessageLogin: '',
  errorColorLogin: false,
  spinnerLogin: false,
  isLogin: false,
};
// == THUNK ==
const instance = axios.create({
  baseURL: 'http://51.75.133.155:3030',
});

/**
 * Envoi de la demande de login au back
 */
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async(user: User,
  {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
  return await instance.post('/login', user)
  .then((response) => {
    return fulfillWithValue(response.data)
  })
  .catch((error)=> {
    return rejectWithValue(error.response.data.error.message);
  })
});

// == SLICE ==
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrorMessageLogin: (state => {
      state.errorMessageLogin = '';
    }),
    disconnect: (state => {
      state.isLogin = false;
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.spinnerLogin = true;
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.spinnerLogin = false;
        state.isLogin = true;
      })
      .addCase(fetchUser.rejected, (state, action: any) => {
        state.spinnerLogin = false;
        state.errorMessageLogin = action.payload;
      })
  },
});

export const { resetErrorMessageLogin, disconnect } = authSlice.actions;

export default authSlice.reducer;