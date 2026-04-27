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

export const fetchMovieById=createAsyncThunk(
    'movies/fetchById',
    async(id,{rejectWithValue})=>{
        try{
            const res=await movieService.getById(id)
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"movie not found")
        }
    }
)

export const searchMovies=createAsyncThunk(
    'movies/search',
    async(id,{rejectWithValue})=>{
        try{
            const res=await movieService.getById(id)
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"movie not found")
        }
    }
)

export const createMovies=createAsyncThunk(
    'movies/create',
    async(data,{rejectWithValue})=>{
        try{
            const res=await movieService.create(data)
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"failed to create movie.")
        }
    }
)

export const deleteMovies=createAsyncThunk(
    "movies/delete",
    async(id,{rejectWithValue})=>{
        try{
            await movieService.remove(id)
            return id

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"failed to delete movie")
        }
    }
)


const movieSlice=createSlice({
    name:"movies",
    initialState:{
        movies:[],
        currentMovies:null,
        searchResults:[],
        total:0,
        pages:0,
        page:1,
        loading:false,
        searchLoading:false,
        error:null,
    },
    reducers:{
        clearCurrentMovie:(state)=>{
            state.currentMovies=null
        },
        clearSearchResults:(state)=>{
            state.searchResults=[]
        },
        clearError:(state)=>{
            state.error=null
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMovies.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchMovies.fulfilled,(state,action)=>{
            state.loading=false
            state.movies=action.payload.data
            state.total=action.payload.total
            state.pages=action.payload.pages
            state.page=action.payload.page
        })
        .addCase(fetchMovies.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchMovieById.pending,(state)=>{
            state.loading=false
            state.error=null
        })
        .addCase(fetchMovieById.fulfilled,(state,action)=>{
            state.loading=false
            state.currentMovies=action.payload
        })
        .addCase(fetchMovieById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(searchMovies.pending,(state)=>{
            state.searchLoading=true
        })
        .addCase(searchMovies.fulfilled,(state,action)=>{
            state.searchLoading=false
            state.error=action.payload
        })
        .addCase(searchMovies.rejected,(state,action)=>{
            state.searchLoading=false
            state.error=action.payload
        })
        .addCase(createMovies.fulfilled,(state,action)=>{
            state.movies.unshift(action.payload)
        })
        .addCase(deleteMovies.fulfilled,(state,action)=>{
            state.movies=state.movies.filter(m=>m._id!==action.payload)
        })
    }
})
export const { clearCurrentMovie,clearSearchResults,clearError }=movieSlice.actions
export default movieSlice.reducer