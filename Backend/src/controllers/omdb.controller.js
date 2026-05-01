import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"
import { searchOMDB,getOMDBMovie } from "../services/omdb.service.js";
import movieModel from "../models/movie.model.js"
import actorModel from "../models/actor.model.js"
import genreModel from "../models/genre.model.js"

export const searchOMDBMovies=asyncHandler(async(req,res)=>{
    const {q}=req.query
    if (!q){
        throw new ApiError(400,"Search query is required")
    }
    const results=await searchOMDB(q)
    const formatted=results.map((m)=>({
        imdbId:m.imdbId,
        title:m.Title,
        releaseYear:m.Year,
        poster:m.Poster!=="N/A"?m.Poster:"",
    }))
    res.status(200).json({
        success:true,
        count:formatted.length,
        data:formatted,
    })
})

// POST /api/omdb/import/:imdbId  (admin only)
export const importOMDBMovie = asyncHandler(async (req, res) => {
  const { imdbId } = req.params

  // check if already imported
  const existing = await movieModel.findOne({ imdbId })
  if (existing) throw new ApiError(400, 'Movie already exists in database')

  // fetch full details from OMDB
  const movie = await getOMDBMovie(imdbId)

  // handle genres — split "Action, Crime, Drama" into array
  const genreNames = movie.Genre !== 'N/A'
    ? movie.Genre.split(', ')
    : []

  const genreIds = await Promise.all(
    genreNames.map(async (name) => {
      let genre = await genreModel.findOne({ name })
      if (!genre) genre = await genreModel.create({ name })
      return genre._id
    })
  )

  // handle actors — split "Tom Hanks, Robin Wright, Gary Sinise" into array
  const actorNames = movie.Actors !== 'N/A'
    ? movie.Actors.split(', ')
    : []

  const castIds = await Promise.all(
    actorNames.map(async (name) => {
      let actor = await actorModel.findOne({ name })
      if (!actor) actor = await actorModel.create({ name })
      return { actor: actor._id, characterName: '' }
    })
  )

  // parse runtime "142 min" → 142
  const duration = movie.Runtime !== 'N/A'
    ? parseInt(movie.Runtime)
    : null

  // parse release year
  const releaseYear = movie.Year !== 'N/A'
    ? parseInt(movie.Year)
    : null

  const newMovie = await movieModel.create({
    title: movie.Title,
    description: movie.Plot !== 'N/A' ? movie.Plot : '',
    releaseYear,
    duration,
    language: movie.Language !== 'N/A' ? movie.Language.split(',')[0].trim() : 'English',
    poster: movie.Poster !== 'N/A' ? movie.Poster : '',
    director: movie.Director !== 'N/A' ? movie.Director : '',
    genres: genreIds,
    cast: castIds,
    imdbId,   // save imdbId to prevent duplicate imports
  })

  res.status(201).json({
    success: true,
    data: newMovie,
  })
})
