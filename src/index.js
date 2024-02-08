// require('dotenv').config({path: './env'}); this code hinders the code consistency so not written this way
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: './env'
})

//when db is connected, let the app listen to port
connectDB()
.then(() => {
    app.listen(process.env.PORT || 4200, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    });
})
.catch( (err) =>  {
    console.log("MongoDb connection failed", err);
})


/*
import express from "express";
const app = express();
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`);
        } )
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
} ) ()
*/

