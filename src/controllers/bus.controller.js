import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Bus from "../models/Bus.model.js";

export const createBus= asyncHandler(async(req, res)=>{
    const {busNumber, from, to, totalSeats}=req.body;
    if((!busNumber||!from||!to||!totalSeats)){
        throw new ApiError(400, "ALl fields are required")
    };

    const existingBus= await Bus.findOne({busNumber});
    if(existingBus) throw new ApiError(400, "Bus already exist")

    const bus= await Bus.create({busNumber, from, to, totalSeats});

    res.status(201).json(new ApiResponse(201, bus, "Bus created successfully"));

});

export const getbuses= asyncHandler(async(req, res)=>{
    const buses= await Bus.find();
    res.status(200).json(new ApiResponse(200, buses, " Buses fetched succesfully"));
});
export const searchBuses = asyncHandler(async(req, res)=>{

    const { from, to}= req.query;

    if(!from || !to ){
        throw new ApiError(400, " From and To location are required");
    }

    const buses = await Bus.find({
        from : {$regex: new RegExp(`${from}$`, "i")},
        to: {$regex: new RegExp(`${to}$`, "i")}
    });

    if(buses.length === 0){
        throw new ApiError(400, " No buses available at this route");
    }

    res.status(200).json(new ApiResponse(200, buses, " available buses fetched"))
});