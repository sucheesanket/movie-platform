import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import Apierror from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"

export const protect=asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        throw new Apierror(401,"Not authorized - please login")
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findById(decoded.id)
    if(!user){
        throw new Apierror(401,"User no longer exists")
    }
    req.user=user
    next()
})

export const restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new Apierror(403,"You do not have permission to perform this action")
        }
        next()
    }
}