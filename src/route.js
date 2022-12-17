//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const UserController = require("./controller/UserController")
const CropController = require("./controller/CropController");
const GenerlController = require("./controller/GeneralConceptController");
const {authentication,Generalauthorisation, Cropauthorisation} = require("./middleware/auth")

//=========User Routes===============
router.post("/register", UserController.createUser);
router.post("/login", UserController.login);

//============Crop Routes=============
router.post("/createCrop",authentication,CropController.createCrop);
router.get("/GetCrop/:CropId",authentication, CropController.viewCrop);
router.put("/EditCrop/:CropId",authentication,Cropauthorisation,CropController.updateCrop);
router.delete("/DeleteCrop/:CropId",authentication,Cropauthorisation,CropController.deleteCrop);

//============General Routes=============
router.post("/createGeneral",authentication,GenerlController.createGeneral);
router.get("/GetGeneral/:GeneralId",authentication, GenerlController.viewGeneral);
router.put("/EditGeneral/:GeneralId",authentication,Generalauthorisation,GenerlController.updateGeneral);
router.delete("/DeleteGeneral/:GeneralId",authentication,Generalauthorisation,GenerlController.deleteGeneral);


//=====================Module Export=====================//
module.exports = router;   