const jwt = require("jsonwebtoken")
const CropUserModel = require("../model/CropPRoperty")
const GenealUserModel = require("../model/GeneralConcept")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "login is required" })
        let decodedtoken = jwt.verify(token, "this is a private key")
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
        req.loggedInUser=decodedtoken.UserId
        next()
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


const Cropauthorisation = async function (req, res, next) {
    try {

        let Id = req.params.CropId;

            let Details = await CropUserModel.findOne({ Id })
            console.log(Details)
            if(!Details) return res.status(400).send({status:false, msg:"No Data with this input given in params"})
            let UserId = Details.userId;

            let id = req.loggedInUser
            if (id != UserId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })

        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

const Generalauthorisation = async function (req, res, next) {
    try {

        let Id = req.params.GeneralId;

            let Details = await GenealUserModel.findOne({ Id })
            if(!Details) return res.status(400).send({status:false, msg:"No Data with this input given in params"})
            let UserId = Details.userId;
            let id = req.loggedInUser
            if (id != UserId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })

        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



module.exports = { authentication , Cropauthorisation, Generalauthorisation  }