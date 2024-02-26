import express, {Request, Response} from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';
import  {v2 as cloudinary} from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-bookings";

cloudinary.config( {
    cloud_name: process.env.CLOUDINAY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("api/my-bookings", bookingRoutes)

app.get("*", (req: Request, res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/index.html"));
})
 
mongoose.connect(process.env.MONGO_URL as string)
    .then(()=>console.log("DB Connected Successfully"))
    .catch((e)=>console.log(e))

app.listen(8080, ()=>{
    console.log("app is running on the port 8080")
});