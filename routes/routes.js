const express = require("express");
const routes = express.Router();
//import userControoler
const userController = require("../controller/userController");

//create a route/api for signup
routes.post("/signup", userController.signUp);
// create a route for signIn
routes.post("/signin", userController.signIn);
module.exports = routes;
