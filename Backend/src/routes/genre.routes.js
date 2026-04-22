import express from "express"
import { createGenre,getAllGenre,updateGenre,deleteGenre } from "../controllers/genre.controller.js"
import { protect, restrictTo } from "../middlewares/auth.js"


const router=express.Router()
router.get("/",getAllGenre)
router.post("/",protect,restrictTo("admin"),createGenre)
router.patch("/:id",protect,restrictTo("admin"),updateGenre)
router.delete("/:id",protect,restrictTo("admin"),deleteGenre)

export default router