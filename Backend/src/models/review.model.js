import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:[true,"Review must belong to a movie"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Review must be belong to a movie"]
    },
    rating:{
        type:Number,
        required:[true,"Rating is must be required"],
        min:1,
        max:10,
    },
    comment:{
        type:String,
        trim:true
    }
},{timestamps:true})

reviewSchema.index({
    movie:1,
    user:1
},{
    unique:true
})

reviewSchema.statics.calcAverageRating = async function (movieId) {
  const stats = await this.aggregate([
    { $match: { movie: movieId } },
    {
      $group: {
        _id: '$movie',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ])

  if (stats.length > 0) {
    await mongoose.model('Movie').findByIdAndUpdate(movieId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].totalReviews,
    })
  } else {
    await mongoose.model('Movie').findByIdAndUpdate(movieId, {
      averageRating: 0,
      totalReviews: 0,
    })
  }
}

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.movie)
})

// Auto-recalculate after a review is deleted
reviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) doc.constructor.calcAverageRating(doc.movie)
})

const reviewModel=mongoose.model("Review",reviewSchema)
export default reviewModel