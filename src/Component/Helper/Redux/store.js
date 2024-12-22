import { configureStore } from "@reduxjs/toolkit";
import Userslicer from "./slice";

export const store = configureStore({
  reducer: {
    user: Userslicer,
  },
});
