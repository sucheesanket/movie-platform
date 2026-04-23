import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:localStorage.getItem("token")||null,
        loading:false,
        error:null,
    },
    reducers:{}
})

export default authSlice.reducer