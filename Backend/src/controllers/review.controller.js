import movieModel from "../models/movie.model.js";
import reviewModel from "../models/review.model.js";
import Apierror from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createReview=asyncHandler(async(req,res)=>{
    const {movieId,rating,comment}=req.body;
    const movie=await movieModel.findById(movieId)
    if(!movie)
    {
        throw new Apierror(404,"Movie not found")
    }
    const review=await reviewModel.create({
        movie:movieId,
        user:req.user._id,
        rating,
        comment
    })

    res.status(200).json({
        success:true,
        data:review
    })
})

export const updateReview=asyncHandler(async(req,res)=>{
    const review=await reviewModel.findById(req.params.id)
    if(!review){
        throw new Apierror(404,"review not found")
    }
    if(review.user.toString()!==req.user._id.toString())
    {
        throw new Apierror(403,"Not allowed to edit this review")
    }
    review.rating=req.body.rating??review.rating
    review.comment=req.body.comment??review.comment
    await review.save()
    res.status(200).json({
        success:true,
        data:review
    })

})

export const deleteReview=asyncHandler(async(req,res)=>{
    const review=await reviewModel.findById(req.params.id)
    if(!review){
        throw new Apierror(404,"review not found")
    }
    if(review.user.toString()!==req.user._id.toString())
    {
        throw new Apierror(403,"Not allowed to delete this review")
    }
    await reviewModel.findOneAndDelete({_id:req.params.id})

    res.status(200).json({
        success:true,
        message:"The review deleted."
    })
})

export const getReviewsByMovie=asyncHandler(async(req,res)=>{
    const reviews=await reviewModel.find({movie:req.params.movieId})
    .populate("user","username avatar")
    .sort("-createdAt")

    res.status(200).json({
        success:true,
        count:reviews.length,
        data:reviews
    })

})

export const getReviewsByUser=asyncHandler(async(req,res)=>{
    const reviews=await reviewModel.find({user:req.user.id})
    .populate("movie", "title poster releaseYear")
    .sort("-createdAt")
    res.status(200).json({
        success:true,
        count:reviews.length,
        data:reviews,
    })
})

