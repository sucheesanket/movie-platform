import mongoose from "mongoose";

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Genre name is required"],
        unique:true,
        trim:true,
    },
    descriprtion:{
        type:String,
        
        trim:true,
    },
    
},{timestamps:true})

const genreModel=mongoose.model("Genre",genreSchema)
export default genreModel