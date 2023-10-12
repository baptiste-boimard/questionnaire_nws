import { createSlice} from "@reduxjs/toolkit";
import { fetchUser } from "./auth";


// == INTERFACE ET TYPE ==
interface ModalDisplayState {
  isOpenLogin: boolean,
  isOpenSignup: boolean,
  isOpenVerify: boolean,
}

// == INITIALSTATE ==
const initialState: ModalDisplayState = {
  isOpenLogin: false,
  isOpenSignup: false,
  isOpenVerify: true,
};

// == SLICE ==
const modalDisplaySlice = createSlice({
  name: "modalDisplay",
  initialState,
  reducers: {
    //Ouvre ferme la modale login
    openLogin : (state: ModalDisplayState) => {
      state.isOpenLogin = !state.isOpenLogin;
    },
    //Ouvre ferme la modale signup
    openSignup : (state: ModalDisplayState) => {
      state.isOpenSignup = !state.isOpenSignup;
    },
    //Ferme les modales
    closeModal : (state: ModalDisplayState) => {
      state.isOpenLogin = false;
      state.isOpenSignup = false;
      state.isOpenVerify = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state) => {
        state.isOpenLogin = false;
      })
  },
});

export const { openLogin, openSignup, closeModal } = modalDisplaySlice.actions;
export default modalDisplaySlice.reducer;