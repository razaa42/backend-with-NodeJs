import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connection successful")
    } catch (error) {
        console.log("DB connection failed, ",error)
    }
}

export default connectDB