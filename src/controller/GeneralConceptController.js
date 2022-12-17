const GeneralModel = require("../model/GeneralConcept");
const { valid, regForName, isValidRequestBody } = require("../validator/validate")

const createGeneral = async function (req, res) {
    try{
        let data = req.body;
        const {Organization, Property, Field, Region } = data;
        data.userId =req.loggedInUser;

        //===================== Checking the input value is Valid or Invalid =====================//
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is empty, please provied data" });
        }

        //=====================Validation of Organization=====================//

        if (!Organization) return res.status(400).send({ status: false, message: "Organization is required" })
        if (!(valid(Organization))) return res.status(400).send({ status: false, msg: "Enter Valid Organization" })
        if (!regForName(Organization)) return res.status(400).send({ status: false, msg: "Enter Valid Organization in Alphabets and first letter in capital" })

        //=====================Validation of Property=====================//

        if (!Property) return res.status(400).send({ status: false, message: "Property is required" })
        if (!(valid(Property))) return res.status(400).send({ status: false, msg: "Enter Valid Property" })
        if (!regForName(Property)) return res.status(400).send({ status: false, msg: "Enter Valid Property in Alphabets and first letter in capital" })

        //=====================Validation of Field=====================//
        if (!Field) return res.status(400).send({ status: false, message: "Field is required" })
        if (!(valid(Field))) return res.status(400).send({ status: false, msg: "Enter Valid Field" })
        if (!regForName(Field)) return res.status(400).send({ status: false, msg: "Enter Valid Field in Alphabets and first letter in capital" })

        //=====================Validation of Region=====================//
        if (!Region) return res.status(400).send({ status: false, message: "Region is required" })
        if (!(valid(Region))) return res.status(400).send({ status: false, msg: "Enter Valid Region" })
        if (!regForName(Region)) return res.status(400).send({ status: false, msg: "Enter Valid Region in Alphabets and first letter in capital" })

        
        //=============Create Crop===================
        let newGeneral = await GeneralModel.create(data)
        res.status(201).send({ status: true, msg: "success", data: newGeneral })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const viewGeneral = async function (req, res) {
    try{
        const Generalid = req.params
        let userId = req.loggedInUser

        //============Get Student Details=====================
        let allGeneral = await GeneralModel.find({Generalid,userId})
        if(!allGeneral){
             return res.status(400).send({status: false, message: "No data with the input"})
            }
        return res.status(200).send({ status: true, data: allGeneral })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateGeneral = async function (req, res) {
    try{
        const Generalid = req.params
        let userId = req.loggedInUser
        let data = req.body;

        //===================== Checking the input value is Valid or Invalid =====================//
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is empty, please provied data to update" });
        }

        //=====================Validation of Organization=====================//

        if(data.Organization){
        if (!(valid(data.Organization))) return res.status(400).send({ status: false, msg: "Enter Valid Organization" })
        if (!regForName(data.Organization)) return res.status(400).send({ status: false, msg: "Enter Valid Organization in Alphabets and first letter in capital" })
        }

        //=====================Validation of Property=====================//

        if(data.Property){
        if (!(valid(data.Property))) return res.status(400).send({ status: false, msg: "Enter Valid Property" })
        if (!regForName(data.Property)) return res.status(400).send({ status: false, msg: "Enter Valid Property in Alphabets and first letter in capital" })
        }

        //=====================Validation of Region=====================//
        if(data.Region){
            if (!(valid(data.Region))) return res.status(400).send({ status: false, msg: "Enter Valid Region" })
            if (!regForName(data.Region)) return res.status(400).send({ status: false, msg: "Enter Valid Region in Alphabets and first letter in capital" })
            }

            //=====================Validation of Region=====================//
        if(data.Field){
            if (!(valid(data.Field))) return res.status(400).send({ status: false, msg: "Enter Valid Field" })
            if (!regForName(data.Field)) return res.status(400).send({ status: false, msg: "Enter Valid Field in Alphabets and first letter in capital" })
            }

        //=============Updating Student Details=================
        let updateGeneral = await GeneralModel.findOneAndUpdate({_Id:Generalid,userId:userId}, req.body, { new: true })
        if(!updateGeneral) return res.status(400).send({status:false, msg:"No Data with this input"})
        return res.status(200).send({ status: true, data: updateGeneral })
 
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteGeneral = async function (req, res) {
    try{
        const Generalid = req.params
        let userId = req.loggedInUser

        //=======Delete Student Details from Collection=============
        let deleteGeneral = await GeneralModel.deleteMany({_Id:Generalid,userId:userId},{ new: true })
        return res.status(200).send({ status: true, data: deleteGeneral })
    } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createGeneral = createGeneral
module.exports.viewGeneral = viewGeneral
module.exports.updateGeneral = updateGeneral
module.exports.deleteGeneral = deleteGeneral