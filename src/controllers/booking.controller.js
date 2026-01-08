import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Booking from "../models/Booking.model.js";
import Bus from "../models/Bus.model.js";

export const  createSeatBooking= asyncHandler(async(req, res)=>{
    const userId= req.user.id;
    const { busId, date, seatNumber}= req.body;

    if(!(busId || date || seatNumber)) throw new ApiError (400, " All  fields are required");

    const bus= await Bus.findById(busId);
    if (!bus){
        throw new ApiError( 400, "Bus not found");
    }

    if(seatNumber > bus.totalSeats || seatNumber<= 0){
        throw new ApiError(400, `Seat number must be between 1 and ${bus.totalSeats}`)
    };
    const existingSeatBooking = await Booking.findOne({userId, busId, seatNumber});

    if(existingSeatBooking) throw new ApiError (400, " Seat alrady booked");

    const booking= await Booking.create({userId, busId, seatNumber, date});
    
    const populateBooking = await Booking.findById(booking.id).populate([
        {path: "userId", select: "fullName email "},
        {path: "busId", select:"busNumber from to totalSeats"}
    ]);

    res.status(201).json(new ApiResponse(201, populateBooking, "Seat booked succesfully"));
});
// get all booking
export const getBooking= asyncHandler(async(req, res)=>{
    const bookings = await Booking.find().populate([
        {path:"userId", select:"fullName email"},
        {path:"busId", select:"busNumber from to totalSeats"}
    ]);
    res.status(201).json(new ApiResponse(201,bookings, "Booking fetched successfully"))
});

export const getMyBookings = asyncHandler( async( req, res)=>{
    const userId = req.user.id;

    const bookings =await Booking.find({userId}).populate([
        {
        path: "busId",
        select: "busNumber from to totalSeats"
        }
    ]);
    res.status(200).json(
        new ApiResponse(200, bookings, "your bookings fetched succesfully")
    );
});

