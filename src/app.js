import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();
//passing origin to allow particular origins 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//accepting json and setting space limit, this method is alternative of bodyParser. 
app.use(express.json({limit: "16kb"}));
//encoding data that comes from url ,for eg %20, extended means nested objects
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
//
app.use(cookieParser());

export { app }