import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authServices.js";


export const register=createAsyncThunk(
    'auth/register',
    async (data,{rejectWithValue})=>{
        try{
            const res=await authService.register(data)
            localStorage.setItem("token",res.data.token)
            return res.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Registration failed")

        }
    }
)

export const login=createAsyncThunk(
    'auth/login',
    async(data,{rejectWithValue})=>{
        try{
            const res=await authService.login(data)
            localStorage.setItem("token",res.data.token)
            return res.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Login Failed")
        }
    }
)

export const fetchMe=createAsyncThunk(
    "auth/getMe",
    async(_,{rejectWithValue})=>{
        try{
            const res=await authService.getMe()
            return res.data.data


        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to fetch user")
        }
    }
)

export const addToWatchList=createAsyncThunk(
    "auth/addWatchlist",
    async(movieId,{rejectWithValue})=>{
        try{
            const res=await authService.addToWatchlist(movieId)
            return res.data.watchlist

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to update watchlist")
        }
    }
)

export const removeFromWatchlist=createAsyncThunk(
    'auth/removeWatchlist',
    async(movieId,{rejectWithValue})=>{
        try{
            const res=await authService.removeFromWatchlist(movieId)
            return res.data.watchlist

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to update watchlist")
        }
    }

)

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:localStorage.getItem("token")||null,
        loading:false,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.user=null
            state.token=null
            localStorage.removeItem('token')
        },
        clearError:(state)=>{
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
        //register
        .addCase(register.pending,(state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.token=action.payload.token
            state.user=action.payload.data
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //login
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.token=action.payload.token
            state.user=action.payload.user
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //fetchMe
        .addCase(fetchMe.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        //watchlist
        .addCase(addToWatchList.fulfilled,(state,action)=>{
            if(state.user)
            {
                state.user.watchlist=action.payload
            }
        })
        .addCase(removeFromWatchlist.fulfilled,(state,action)=>{
            if(state.user)
            {
                state.user.watchlist=action.payload
            }
        })
    }
})

export const {logout,clearError}=authSlice.actions
export default authSlice.reducer