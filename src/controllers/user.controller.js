import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/User.model.js";

const createUser= asyncHandler(async(req, res)=>{
    const {fullName, email, password}= req.body;
    if(!fullName||!email||!password){
        throw new ApiError(400, "All fields are required")
    }
    const existingUser= await User.findOne({email});
    if(existingUser) throw new ApiError(400, "User already exist")

    const user= await User.create({fullName, email, password});

    res.status(201).json(new ApiResponse(201, user, " user create successfullly"))
})

export default createUser