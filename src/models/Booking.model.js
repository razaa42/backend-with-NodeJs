import mongoose  from "mongoose";

const bookingSchema= new mongoose.Schema(
    {
       userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
       },
       busId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Bus",
        required:true
       },
       seatNumber:{
        type: Number,
        required: true
       },
       date:{
        type: String,
        required:true
       }

    },{timestamps:true})

    bookingSchema.index(
        {busId:1, seatNumber:1, date:1},{unique:true}
    );

    const Booking= mongoose.model("Booking", bookingSchema);

    export default Booking