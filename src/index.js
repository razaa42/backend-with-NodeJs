import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({
    path: "./.env",
 });
 connectDB()
 .then(()=>{
        app.listen(process.env.PORT ||5000, ()=>{
            console.log(`server running on port ${process.env.PORT}`);
        });
    })
   .catch((error)=>{
    console.error("Datebase connnection error", error)
});