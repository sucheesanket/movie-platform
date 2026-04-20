import mongoose from "mongoose";
const actorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"The name of actor is required"],
        trim:true,
    },
    bio:{
        type:String,
        
        trim:true,
    },
    birthDate:{
        type:Date,
        
    },
    birthPlace:{
        type:String,
        
        trim:true,
    },
    photo:{
        type:String,
        default:'',
    },
},{
    timestamps:true
})

const actorModel=mongoose.model("Actor",actorSchema)
export default actorModel