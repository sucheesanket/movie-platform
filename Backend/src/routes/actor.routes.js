import express from "express"
import { createActor,getAllActor,getActorById,updateActor,deleteActor } from "../controllers/actor.controller.js"

const router=express.Router()
router.post("/",createActor)
router.get("/",getAllActor)
router.get("/:id",getActorById)
router.put("/:id",updateActor)
router.delete("/:id",deleteActor)

export default router
