import userModel from "../models/user.model.js";
import Apierror from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";


export const register=asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body;
    const existing=await userModel.findOne({email})
    if(existing){
        throw new Apierror(400,"Email is already registered")
    }
    const user=await userModel.create({
        username,
        email,
        password
    })
    const token=generateToken(user._id,user.role)
    res.status(201).json({
        success:true,
        token,
        data:{
            id:user._id,
            name:user.username,
            email:user.email,
            role:user.role
        }
    })
})

export const login=asyncHandler(async(req,res)=>{
    const{email,password}=req.body

    if(!email||!password){
        throw new Apierror(400,"please provide email and password")
    }
    const user=await userModel.findOne({email}).select("+password")
    if(!user){
        throw new Apierror(401,"invalid email or password ")
    }
    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        throw new Apierror(401,"Invalid email or password")
    }
    const token=generateToken(user._id,user.role)
    res.status(200).json({
        success:true,
        token,
        data:{
            id:user._id,
            name:user.username,
            email:user.email,
            role:user.role
        }
    })
})

export const getMe=asyncHandler(async(req,res)=>{
    const user=await userModel.findById(req.user.id)
    res.status(200).json({
        success:true,
        data:user
    })
})

export const updatePassword=asyncHandler(async(req,res)=>{
    const {currentPassword,newPassword}=req.body
    const user=await userModel.findById(req.user.id).select("+password")
    const isMatch=await user.comparePassword(currentPassword)
    if(!isMatch){
        throw new Apierror(401,"Current password is incorrect")
    }
    user.password=newPassword
    await user.save()
    const token=generateToken(user._id,user.role)
    res.status(200).json({
        success:true,
        token
    })
})