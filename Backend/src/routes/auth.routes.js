import express from "express"
import { register,login,getMe,updatePassword,addToWatchList,removeFromWatchlist } from "../controllers/auth.controller.js"
import { protect } from "../middlewares/auth.js"
const router=express.Router()
router.post("/register",register)
router.post("/login",login)
router.get("/get-me",protect,getMe)
router.patch("/update-password",protect,updatePassword)

router.post("/watchlist/:movieId",protect,addToWatchList)
router.delete("/watchlist/:movieId",protect,removeFromWatchlist)
export default router