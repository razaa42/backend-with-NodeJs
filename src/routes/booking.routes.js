import express from "express";
import { createSeatBooking, getBooking, getMyBookings } from "../controllers/booking.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/",authMiddleware,createSeatBooking);
router.get("/",authMiddleware,getBooking)
router.get("/me",authMiddleware,getMyBookings)

export default router