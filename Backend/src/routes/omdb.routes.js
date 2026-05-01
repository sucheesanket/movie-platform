import express from "express"
import { searchOMDBMovies,importOMDBMovie } from "../controllers/omdb.controller.js"
import { protect,restrictTo } from "../middlewares/auth.js"
const router=express.Router()
router.get("/search",searchOMDBMovies)
router.post("/import/:imdbId",protect,restrictTo("admin"),importOMDBMovie)

export default router