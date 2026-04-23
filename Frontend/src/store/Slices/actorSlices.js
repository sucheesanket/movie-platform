import { createSlice } from "@reduxjs/toolkit";
const actorSlice=createSlice({
    name:'actors',
    initialState:{
        actors:[],
        loading:false,
        error:null
    },
    reducers:{}
})

export default actorSlice.reducer