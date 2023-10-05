import { createSlice, PayloadAction} from "@reduxjs/toolkit";

// == INTERFACE ET TYPE ==
interface UtilitiesState {
  email: string,
  password: string,
}

// == INITIALSTATE ==
const initialState: UtilitiesState = {
  email: '',
  password: '',
};

// == SLICE ==
const utilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    handleFieldChange : (state: UtilitiesState, action: PayloadAction<{name: string, value: string}>) => {      
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    },
  },
  extraReducers: (builder) => {

  },
});

export const { handleFieldChange } = utilitiesSlice.actions;
export default utilitiesSlice.reducer;