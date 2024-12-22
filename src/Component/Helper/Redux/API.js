import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
const loagin_id = localStorage.getItem("id");
// const roletype = localStorage.getItem("roletype");
const api_url = process.env.REACT_APP_BASE_URL;


export const isLoginAPI = createAsyncThunk("user/login", async (body) => {
  const res = await fetch(api_url + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.ok) {

    return data;
  } else {
   
    throw new Error(data.error);
  }
});

