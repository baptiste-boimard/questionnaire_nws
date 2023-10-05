import { createSlice} from "@reduxjs/toolkit";

// == INTERFACE ET TYPE ==
interface LoginState {
  isOpenLogin: boolean,
  isOpenSignup: boolean,
}

// == INITIALSTATE ==
const initialState: LoginState = {
  isOpenLogin: false,
  isOpenSignup: false,
};

// == SLICE ==
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