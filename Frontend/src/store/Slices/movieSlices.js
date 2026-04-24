import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import movieService from "../../services/movieService.js"
export const fetchMovies=createAsyncThunk(
    "movies/fetchAll",
    async(params,{rejectWithValue})=>{
        try{
            const res=await movieService.getAll(params)
            return res.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to fetch movies")

        }
    }
)


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