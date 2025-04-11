import express from "express";
//import Student from "../models/student.js";
import {getStudent, createStudent, deleteStudent} from "../controllers/studentController.js";




//create studentrouter
const studentRouter = express.Router();

studentRouter.get("/",getStudent) 
    
studentRouter.post("/",createStudent)


studentRouter.delete("/",deleteStudent)

export default studentRouter;
    

   