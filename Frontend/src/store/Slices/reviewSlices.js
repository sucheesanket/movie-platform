import { createSlice } from "@reduxjs/toolkit";

const reviewSlice=createSlice({
    name:"review",
    initialState:{
        reviews:[],
        loading:false,
        error:null,
    },
    reducers:{},
})

export default reviewSlice.reducer