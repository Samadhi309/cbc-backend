import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export function createUser (req,res){

    const newUserData =req.body;

    if(newUserData.type == "admin"){

        if (req.user==null){
            res.json({
                message:"Please log in as a administrator to create admin account"
            })
            return 
        }
    
        if(req.user.type != "admin"){
            res.json({
                message:"Please log in as a administrator to create admin account"
            })
            return
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password,10);

    const user = new User(newUserData);

    user.save().then(()=>{
        res.json({message : "User created"
        });
    }).catch(()=>{
        res.json({
            message : "User not created"
        });
    })
}

export function loginUser(req,res){
    console.log(req.body);

    User.find({email: req.body.email}).then (
        (users)=>{
       if (users.length === 0){
        res.json({
            message : "user not found"
        })

       } else{
            const user = users[0];
            console.log("🔹 Requested Email & Password:", req.body); 
            console.log("🔹 Stored Hashed Password:", user.password);

            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password);
            console.log("🔹 Password Match Result:", isPasswordCorrect);

            if (isPasswordCorrect){
                
                const token = jwt.sign({
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isblocked : user.isblocked,
                    type : user.type,
                    profilePicture : user.profilePicture,
                },process.env.SECRET)
            
                res.json({
                    message: "User Logged in",
                    token: token
                });
            }
        }
       
    })
    .catch((err) => {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Internal Server Error" }); // ✅ Handle errors properly
    });
}

export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.type != "admin"){
        return false
    }
    return true
}
export function iscustomer(req){
    if(req.user==null){
        return false
    }
    if(req.user.type != "customer"){
        return false
    }
    return true
}

   // "samadhi@example.com","Gradgirl123#"<---admin
   