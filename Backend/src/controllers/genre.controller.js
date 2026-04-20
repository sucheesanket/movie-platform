import genreModel from "../models/genre.model.js";
import Apierror from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createGenre=asyncHandler(async(req,res)=>{
    const genre=await genreModel.create(req.body)
    res.status(200).json({
        success:true,
        data:genre
    })
})

export const getAllGenre=asyncHandler(async(req,res)=>{
    const genres=await genreModel.find().sort("name")
    res.status(201).json({
        success:true,
        count:genres.length,
        data:genres
    })
})

export const updateGenre=asyncHandler(async(req,res)=>{
    const genre= await genreModel.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new:true,
            runValidators:true,
        }
    )
    if(!genre)
    {
        throw new Apierror(404,"Genre not found")
    }

    res.status(200).json({
        success:true,
        data:genre
    })
})

export const deleteGenre=asyncHandler(async(req,res)=>{
    const genre=await genreModel.findByIdAndDelete(req.params.id)
    if(!genre){
        throw new Apierror(404,"Genre not found")
    }
    res.status(200).json({
        success:true,
        message:"Genre deleted successfully"
    })
})