import { createSlice, PayloadAction} from "@reduxjs/toolkit";

// == INTERFACE ET TYPE ==
interface UtilitiesState {
  email: string,
  password: string,
}

type ControlledField = {
  name: string,
  value: string
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
    // Change la valeurs des champs controllés du state
    handleFieldChange : (state: UtilitiesState, action: PayloadAction<ControlledField>) => {      
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