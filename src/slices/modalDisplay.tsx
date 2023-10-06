import { createSlice} from "@reduxjs/toolkit";

// == INTERFACE ET TYPE ==
interface ModalDisplayState {
  isOpenLogin: boolean,
  isOpenSignup: boolean,
}

// == INITIALSTATE ==
const initialState: ModalDisplayState = {
  isOpenLogin: false,
  isOpenSignup: false,
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
    //Ferme les modales login & signup
    closeModal : (state: ModalDisplayState) => {
      state.isOpenLogin = false;
      state.isOpenSignup = false;
    },
  },
  extraReducers: (builder) => {
  },
});

export const { openLogin, openSignup, closeModal } = modalDisplaySlice.actions;
export default modalDisplaySlice.reducer;