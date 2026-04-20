import express from "express"
import { createGenre,getAllGenre,updateGenre,deleteGenre } from "../controllers/genre.controller.js"

const router=express.Router()
router.post("/",createGenre)
router.get("/",getAllGenre)
router.put("/:id",updateGenre)
router.delete("/:id",deleteGenre)

export default router