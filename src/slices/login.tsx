import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";


interface LoginState {
  isOpenLogin: boolean,
  isOpenSignup: boolean,
}

const initialState: LoginState = {
  isOpenLogin: false,
  isOpenSignup: false,
};


const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLogin : (state: LoginState) => {
      state.isOpenLogin = !state.isOpenLogin;
    },
    openSignup : (state: LoginState) => {
      state.isOpenSignup = !state.isOpenSignup;
    },
    closeModal : (state: LoginState) => {
      state.isOpenLogin = false;
      state.isOpenSignup = false;
    },
  },
  extraReducers: (builder) => {

  },
});

export const { openLogin, openSignup, closeModal } = loginSlice.actions;

export default loginSlice.reducer;