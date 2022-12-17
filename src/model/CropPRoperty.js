const mongoose=require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CropCycleSchema= new mongoose.Schema({
    CropCycleProperty: {
        type: String, 
        required :true, 
        trim:true
    },
    CropCycleField: {
        type: String, 
        required :true,
        trim:true
    },
    Crop: {
        type: String, 
        required :true, 
        trim:true
    },
    userId: {
        type: ObjectId,
         ref: "UserCropCollection",
          required :true
         }
},{timeStamps: true})

module.exports= mongoose.model("CropCycleCollection",CropCycleSchema)