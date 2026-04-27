import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import actorService from "../../services/actorService.js"

export const fetchActors=createAsyncThunk(
    "actors/fetchAll",
    async(_,{rejectWithValue})=>{
        try{
            const res=await actorService.getAll()
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to fetch actors")
        }
    }
)

export const fetchActorById=createAsyncThunk(
    "actors/fetchById",
    async(id,{rejectWithValue})=>{
        try{
            const res=await actorService.getById(id)
            return res.data.data

        }
        catch(err){
            return rejectWithValue(err.response?.data?.message||"Failed to fetch actor by id")
        }
    }
)

const actorSlice=createSlice({
    name:'actors',
    initialState:{
        actors:[],
        currentActor:null,
        loading:false,
        error:null
    },
    reducers:{
        clearCurrentActor:(state)=>{
            state.currentActor=true
        }
    },
    extraReducers:(builder)=>{
        builder

        .addCase(fetchActors.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchActors.fulfilled,(state,action)=>{
            state.loading=false
            state.actors=action.payload
        })
        .addCase(fetchActors.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchActorById.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchActorById.fulfilled,(state,action)=>{
            state.loading=false
            state.currentActor=action.payload
        })
        .addCase(fetchActorById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

    }

})


export const {clearCurrentActor}=actorSlice.actions
export default actorSlice.reducer