import express from "express"
import { register,login,getMe,updatePassword } from "../controllers/auth.controller.js"
import { protect } from "../middlewares/auth.js"
const router=express.Router()
router.post("/register",register)
router.post("/login",login)
router.get("/get-me",protect,getMe)
router.put("/update-password",protect,updatePassword)
export default router