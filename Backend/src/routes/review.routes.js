import express from "express"
import { createReview,getReviewsByMovie,updateReview,deleteReview } from "../controllers/review.controller.js"
import { protect } from "../middlewares/auth.js"

const router=express.Router()


router.get("/movie/:movieId",getReviewsByMovie)
router.post("/",protect,createReview)
router.put("/:id",protect,updateReview)
router.delete("/:id",protect,deleteReview)

export default router