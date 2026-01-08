import express from "express";
import  {createBus, getbuses,searchBuses} from "../controllers/bus.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router= express.Router();

router.post("/",authMiddleware,createBus)
router.get("/",getbuses)
router.get("/search",searchBuses)

export default router