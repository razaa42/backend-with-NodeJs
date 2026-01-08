import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const loginUser= asyncHandler(async(req, res)=>{

    const {email, password}= req.body;

    if(!(email||password)) {
        throw new ApiError(400, "Email and Password required");

    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new ApiError(401, " Invalid credentials");
    }
    const isMatch= await user.isPasswordValid(password);
    if(!isMatch){
        throw new ApiError(401, "Invalid credentials" )
    }
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    user.password= undefined;

    res.status(200).json(new ApiResponse(
        200, 
        {user,
         token},
         "Login successfully"
        ))
});

