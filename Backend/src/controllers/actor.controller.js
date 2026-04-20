import actorModel from "../models/actor.model.js";
import Apierror from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createActor=asyncHandler(async(req,res)=>{
    const actor=await actorModel.create(req.body)
    res.status(201).json({
        success:true,
        data:actor
    })
})

export const getAllActor=asyncHandler(async(req,res)=>{
    const actors=await actorModel.find().sort("name")
    res.status(200).json({
        success:true,
        count:actors.length,
        data:actors
    })
})

export const getActorById=asyncHandler(async(req,res)=>{
    const actor=await actorModel.findById(req.params.id)
    if(!actor){
        throw new Apierror(404,"Actor not found")
    }
    res.status(200).json({
        success:true,
        data:actor
    })
})

export const updateActor=asyncHandler(async(req,res)=>{
    const actor=await actorModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true
        }
    )
    if(!actor){
        throw new Apierror(404,"Actor not found")
    }
    res.status(200).json({
        success:true,
        data:actor
    })
})

export const deleteActor=asyncHandler(async(req,res)=>{
    const actor=await actorModel.findByIdAndDelete(req.params.id)
    if(!actor)
    {
        throw new Apierror(404,"Actor not found")
    }
    res.status(200).json({
        success:true,
        message:"actor deleted successfully"
    })
})