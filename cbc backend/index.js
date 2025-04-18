import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./Routes/product-route.js";
import userRouter from "./Routes/user-route.js";
import jwt from "jsonwebtoken";

const app = express();

const mongourl= "mongodb+srv://samadhipoorni98:ABCD4321@cluster0.a1ken.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongourl,{});

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected")
});


app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const token = req.headers["authorization"]?.replace("Bearer ", " ");

        if(token != null){
            jwt.verify(token, "cbc-secret-key-7973", (error,decoded)=>{
                if(!error){
                    req.user = decoded; // Assign decoded user information to req.user
                }else {
                    return res.status(401).json({ message: "Unauthorized: Invalid token" }); // Add return here
                }

            });
        } 
    next();
});  





app.use("/api/products",productRouter)

app.use("/api/users",userRouter)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });




