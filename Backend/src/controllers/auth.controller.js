import userModel from "../models/user.model.js";
import movieModel from "../models/movie.model.js";
import Apierror from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { application } from "express";
import { use } from "react";



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
    const user=await userModel
    .findById(req.user.id)
    .populate("watchlist","title releaseYear poster averageRating")

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

export const addToWatchList=asyncHandler(async(req,res)=>{
    const { movieId }=req.params
    const movie=await movieModel.findById(movieId)
    if(!movie){
        throw new Apierror(404,"Movie not found")
    }
    const user=await userModel.findById(req.user.id)
    const alredayAdded=user.watchlist.includes(movieId)
    if(alredayAdded){
        throw new Apierror(400,"Movie already in watchlist")
    }
    user.watchlist.push(movieId)
    await user.save()

    res.status(200).json({
        success:true,
        message:"Movie added to watchlist",
        watchlist:user.watchlist,
    })
})

export const removeFromWatchlist=asyncHandler(async(req,res)=>{
    const {movieId}=req.params
    const user=await userModel.findById(req.user.id)
    const exists=user.watchlist.includes(movieId)
    if(!exists){
        throw new Apierror(400,"Movie not in watchlist")
    }
    user.watchlist=user.watchlist.filter(
        (id)=>id.toString()!==movieId
    )
    await user.save()

    res.status(200).json({
        success:true,
        message:"Movie removed from watchlist",
        watchlist:user.watchlist,
    })
})