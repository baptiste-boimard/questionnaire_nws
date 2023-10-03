import { createSlice} from "@reduxjs/toolkit";

interface UtilitiesState {
  email: string,
  password: string,
}

const initialState: UtilitiesState = {
  email: '',
  password: '',
};

const utilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    handleFieldChange : (state: UtilitiesState, action) => {
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