import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/user-route.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productRouter from "./Routes/productRouter.js";
dotenv.config()

const app = express();

const mongourl= process.env.MONGO_DB_URI
mongoose.connect(mongourl,{});

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected")
});


app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const token = req.headers["authorization"]?.replace("Bearer ", "").trim();


        if(token != null){
            jwt.verify(token, process.env.SECRET, (error,decoded)=>{
                if(!error){
                    req.user = decoded; // Assign decoded user information to req.user
                }else {
                    return res.status(401).json({ message: "Unauthorized: Invalid token" }); // Add return here
                }

            });
        } 
    next();
});  







app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });




