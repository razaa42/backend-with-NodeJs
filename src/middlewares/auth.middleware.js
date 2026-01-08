import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authMiddleware= (req, res, next)=>{

    const authHeader= req.header("Authorization");
    if(!authHeader){
        return next(new ApiError(401, "Authorization  header missing"))
    }

    const token= authHeader.replace("Bearer ", "");

    if(!token){
        return next(new ApiError(401, " unauthorized"))
    };

    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET);

        req.user= decoded;
        next();
        
    } catch (error) {
        return next (new ApiError(401, "invalid token"))
    }
};

export default authMiddleware
