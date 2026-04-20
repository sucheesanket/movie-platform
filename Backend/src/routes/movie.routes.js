import express from "express"
import { getAllMovies,createMovie,updateMovie,deleteMovie,searchMovies,getMovieById } from "../controllers/movie.controller.js"

const router=express.Router()
router.post("/",createMovie)
router.get("/",getAllMovies)
router.get("/:id",getMovieById)
router.get("/search",searchMovies)
router.put("/:id",updateMovie)
router.delete("/:id",deleteMovie)
