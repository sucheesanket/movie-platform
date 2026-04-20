import movieModel from "../models/movie.model.js";
import Apierror from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createMovie=asyncHandler(async(req,res)=>{
    const movie=await movieModel.create(req.body)
    res.status(201).json({
        success:true,
        data:movie
    })
})

export const updateMovie=asyncHandler(async(req,res)=>{
    const movie=await movieModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!movie){
        throw new Apierror(404,"movie not found")
    }
    res.status(200).json({
        success:true,
        data:movie
    })
})

export const deleteMovie=asyncHandler(async(req,res)=>{
    const movie=await movieModel.findByIdAndDelete(req.params.id)
    if(!movie){
        throw new Apierror(404,"Movie not found")
    }
    res.status(200).json({
        success:true,
        message:"Movie deleted"
    })
})

export const getAllMovies=asyncHandler(async(req,res)=>{
    const {genre,minRating,year,sort,page=1,limit=10}=req.query
    const filter={}
    if(genre) filter.generes=genre
    if(year) filter.releaseYear=Number(year)
    if(minRating) filter.averageRating={$gte:Number(minRating)}

    const sortBy=sort?sort.split(",").join(' '):"-createdAt"
    const skip=(Number(page)-1)*Number(limit)

    const[movies,total]=await Promise.all([
        movieModel.find(filter)
        .populate("genres","name")
        .populate("cast.actor","name photo")
        .sort(sortBy)
        .skip(skip)
        .limit(Number(limit)),
        movieModel.countDocuments(filter)
    ])

    res.status(200).json({
        success:true,
        total,
        page:Number(page),
        pages:Math.ceil(total/Number(limit)),
        data:movies
    })

})

export const searchMovies=asyncHandler(async(req,res)=>{
    const {q}=req.query
    if(!q){
        throw new Apierror(400,"Search query is required")
    }

    const movies=await movieModel.find(
        {$text:{$search:q}},
        {score:{$meta:'textScore'}}
    )
    .populate("genres","name")
    .sort({score:{$meta:"textScore"}})
    .limit(20)

    res.status(200).json({
        success:true,
        count:movies.length,
        data:movies
    })
})

export const getMovieById=asyncHandler(async(req,res)=>{
    const movie=await movieModel.findById(req.params.id)
    .populate("genres","name")
    .populate("cast.actor","name photo birthDate")
    if(!movie){
        throw new Apierror(404,"Movie not found")
    }
    res.status(200).json({
        success:true,
        data:movie
    })
})

