const mongoose=require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const generalSchema= new mongoose.Schema({
    Organization: {
        type: String, 
        required :true, 
        trim:true
    },
    Property: {
        type: String, 
        required :true,
        trim:true
    },
    Region: {
        type: String, 
        required :true, 
        trim:true
    },
    Field: {
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

module.exports= mongoose.model("GeneralConceptsCollection",generalSchema)