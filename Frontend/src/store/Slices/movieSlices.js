import { createSlice } from "@reduxjs/toolkit"


const movieSlice=createSlice({
    name:"movies",
    initialState:{
        movies:[],
        loading:false,
        error:null,
    },
    reducers:{},
})
export default movieSlice.reducer