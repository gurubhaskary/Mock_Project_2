const CropModel = require("../model/CropPRoperty");
const { valid, regForName, isValidRequestBody } = require("../validator/validate")

const createCrop = async function (req, res) {
    try{
        let data = req.body;
        const {CropCycleProperty, CropCycleField, Crop } = data;
        data.userId =req.loggedInUser;

        //===================== Checking the input value is Valid or Invalid =====================//
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is empty, please provied data" });
        }

        //=====================Validation of CropCycleProperty=====================//

        if (!CropCycleProperty) return res.status(400).send({ status: false, message: "Name is required" })
        if (!(valid(CropCycleProperty))) return res.status(400).send({ status: false, msg: "Enter Valid Name" })
        if (!regForName(CropCycleProperty)) return res.status(400).send({ status: false, msg: "Enter Valid Name in Alphabets and first letter in capital" })

        //=====================Validation of CropCycleField=====================//

        if (!CropCycleField) return res.status(400).send({ status: false, message: "subject is required" })
        if (!(valid(CropCycleField))) return res.status(400).send({ status: false, msg: "Enter Valid Name" })
        if (!regForName(CropCycleField)) return res.status(400).send({ status: false, msg: "Enter Valid Name in Alphabets and first letter in capital" })

        //=====================Validation of Crop=====================//
        if (!Crop) return res.status(400).send({ status: false, message: "subject is required" })
        if (!(valid(Crop))) return res.status(400).send({ status: false, msg: "Enter Valid Name" })
        if (!regForName(Crop)) return res.status(400).send({ status: false, msg: "Enter Valid Name in Alphabets and first letter in capital" })

        
        //=============Create Crop===================
        let newCrop = await CropModel.create(data)
        res.status(201).send({ status: true, msg: "success", data: newCrop })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const viewCrop = async function (req, res) {
    try{
        const cropid = req.params
        let userId = req.loggedInUser

        //============Get Student Details=====================
        let allCrop = await CropModel.find({cropid,userId})
        if(!allCrop){
             return res.status(400).send({status: false, message: "No data with the input"})
            }
        return res.status(200).send({ status: true, data: allCrop })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateCrop = async function (req, res) {
    try{
        const cropid = req.params
        let userId = req.loggedInUser
        let data = req.body;

        //===================== Checking the input value is Valid or Invalid =====================//
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is empty, please provied data to update" });
        }

        //=====================Validation of CropCycleProperty=====================//

        if(data.CropCycleProperty){
        if (!(valid(data.CropCycleProperty))) return res.status(400).send({ status: false, msg: "Enter Valid CropCycleProperty" })
        if (!regForName(data.CropCycleProperty)) return res.status(400).send({ status: false, msg: "Enter Valid CropCycleProperty in Alphabets and first letter in capital" })
        }

        //=====================Validation of CropCycleField=====================//

        if(data.CropCycleField){
        if (!(valid(data.CropCycleField))) return res.status(400).send({ status: false, msg: "Enter Valid CropCycleField" })
        if (!regForName(data.CropCycleField)) return res.status(400).send({ status: false, msg: "Enter Valid CropCycleField in Alphabets and first letter in capital" })
        }

        //=====================Validation of Crop=====================//
        if(data.Crop){
            if (!(valid(data.Crop))) return res.status(400).send({ status: false, msg: "Enter Valid Crop" })
            if (!regForName(data.Crop)) return res.status(400).send({ status: false, msg: "Enter Valid Crop in Alphabets and first letter in capital" })
            
            }

        //=============Updating Student Details=================
        let updateCrop = await CropModel.findOneAndUpdate({_Id:cropid,userId:userId}, req.body, { new: true })
        if(!updateCrop) return res.status(400).send({status:false, msg:"No Data with this input"})
        return res.status(200).send({ status: true, data: updateCrop })
 
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteCrop = async function (req, res) {
    try{
        const cropid = req.params
        let userId = req.loggedInUser

        //=======Delete Student Details from Collection=============
        let deleteCrop = await CropModel.deleteMany({_Id:cropid,userId:userId},{ new: true })
        return res.status(200).send({ status: true, data: deleteCrop })
    } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createCrop = createCrop
module.exports.viewCrop = viewCrop
module.exports.updateCrop = updateCrop
module.exports.deleteCrop = deleteCrop