import express from "express"
import { getAllMovies,createMovie,updateMovie,deleteMovie,searchMovies,getMovieById } from "../controllers/movie.controller.js"
import { protect,restrictTo } from "../middlewares/auth.js"



const router=express.Router()
router.get("/search",searchMovies)
router.get("/",getAllMovies)
router.get("/:id",getMovieById)

router.post("/",protect,restrictTo("admin"),createMovie)
router.put("/:id",protect,restrictTo("admin"),updateMovie)
router.delete("/:id",protect,restrictTo("admin"),deleteMovie)

export default router
