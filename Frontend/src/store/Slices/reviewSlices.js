import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../../services/reviewService.js"


export const fetchReviewsByMovie=createAsyncThunk(
    'reviews/fetchByMovie',
    async (movieId,{rejectWithValue})=>{
        try{
            const res=await reviewService.getByMovie(movieId)
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to fetch reviews")
        }
    }
)

export const createReviews=createAsyncThunk(
    "reviews/create",
    async(data,{rejectWithValue})=>{
        try{
            const res=await reviewService.create(data)
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to create reviews")
        }
    }
)

export const deleteReviews=createAsyncThunk(
    "reviews/delete",
    async(id,{rejectWithValue})=>{
        try{
            const res=await reviewService.remove(id)
            return id

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to delete review")
        }
    }
)

const reviewSlice=createSlice({
    name:"reviews",
    initialState:{
        reviews:[],
        loading:false,
        error:null,
    },
    reducers:{
        clearReviews:(state)=>{
            state.reviews=[]

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchReviewsByMovie.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchReviewsByMovie.fulfilled,(state,action)=>{
            state.loading=false
            state.reviews=action.payload
        })
        .addCase(fetchReviewsByMovie.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload

        })
        .addCase(createReviews.fulfilled,(state,action)=>{
            state.reviews.unshift(action.payload)
        })
        .addCase(deleteReviews.fulfilled,(state,action)=>{
            state.reviews=state.reviews.filter(r=>r._id!==action.payload)
        })
    }
})


export const {clearReviews}=reviewSlice.actions
export default reviewSlice.reducer