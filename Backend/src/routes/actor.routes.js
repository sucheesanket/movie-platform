import express from "express"
import { createActor,getAllActor,getActorById,updateActor,deleteActor } from "../controllers/actor.controller.js"
import { protect, restrictTo } from "../middlewares/auth.js"


const router=express.Router()
router.get("/",getAllActor)
router.get("/:id",getActorById)
router.post("/",protect,restrictTo("admin"),createActor)
router.put("/:id",protect,restrictTo("admin"),updateActor)
router.delete("/:id",protect,restrictTo("admin"),deleteActor)

export default router
