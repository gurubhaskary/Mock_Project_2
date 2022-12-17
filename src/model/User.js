const mongoose=require("mongoose")

const UserCropSchema= new mongoose.Schema({
    name:{
        type: String, 
        required :true, 
        trim:true
    },
    email:{
        type: String, 
        required :true, 
        trim:true
    },
    password:{
        type: String, 
        required :true, 
        trim:true
    }
},{timeStamps: true})

module.exports= mongoose.model("UserCropCollection",UserCropSchema)