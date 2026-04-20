import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"The username must be required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"The email must be required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"The password must be required"],
        minlength:6,
        select:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        
    },
    watchlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Movie"
        }
    ],
    avatar:{
        type:String,
        default:''
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        
        return next
    } 
    this.password=await bcrypt.hash(this.password,12)
    next()
})

userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)

}

const userModel=mongoose.model("User",userSchema)
export default userModel

