import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    isBlock :{
        type : Boolean,
        default : false,
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePicture : {
        type : String,
        default :"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    },
})

const User = mongoose.model("users",userSchema);

export default User;