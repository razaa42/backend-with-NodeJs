import mongoose from "mongoose";

const busSchema= new mongoose.Schema(
    {

        busNumber:{
            type: String,
            required: true,
            unique: true
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type: String,
            required:true
        },
        totalSeats:{
            type: Number,
            required:true
        }

    },
    {
    timestamps:true

});

busSchema.virtual("availableSeats").get(function(){
    return this.totalSeats
});

const Bus= mongoose.model("Bus", busSchema)

export default Bus