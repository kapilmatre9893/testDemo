import { createSlice } from "@reduxjs/toolkit";
import * as API from "./API";
const apiArray = [
  API.isLoginAPI,
];

const userslice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
    permissions: null,
    requestMycart: [],
  },

  reducers: {
    // setpermissionsType: (state, action) => {
    //   state.permissions = action.payload;
    // },
    // setRequestMycart: (state, action) => {
    //   state.requestMycart.push(action.payload);
    // },
    // removeRequestMycart(state, action) {
    //   state.requestMycart.splice(action.payload, 1); // Remove item by index
    // },
  },

  extraReducers: (builder) => {
    apiArray.forEach((api) => {
      builder
        .addCase(api.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(api.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(api.rejected, (state, action) => {
          state.isLoading = false;
          state.error = true;
        });
    });
  },
});
export const { setpermissionsType, setRequestMycart, removeRequestMycart } =
  userslice.actions;

export default userslice.reducer;
