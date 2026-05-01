import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    releaseYear: {
        type: Number,
        required: [true, "Release year is must be required"]
    },
    duration: {
        type: Number,

    },
    language: {
        type: String,
        default: "English"
    },
    poster: {
        type: String,
        default: ""
    },
    trailerUrl: {
        type: String,
        default: ""
    },
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre"

        },
    ],
    cast: [{
        actor:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actor"

        },
        characterName: {
            type: String,
            trim: true

        }

    }

    ],

    director: {
        type: String,
        trim: true
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    imdbId:{
        type:String,
        default:"",
        unique:true,
        sparse:true,
    }
},
    { timestamps: true })

movieSchema.index({
    title: "text",
    description: "text"
})

const movieModel = mongoose.model("Movie", movieSchema)
export default movieModel