import express from "express";
import cors from "cors";
import  busRoutes from "./routes/bus.routes.js";
import userRoutes from "./routes/user.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bus",busRoutes)
app.use("/api/user",userRoutes)
app.use("/api/booking",bookingRoutes)
app.use("/api/auth",authRoutes)


app.use(errorMiddleware)
export default app;