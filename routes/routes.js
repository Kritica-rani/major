const express = require("express");
const routes = express.Router();
const passport = require("passport");
//import userControoler
const userController = require("../controller/userController");
//import quotation controller
const quotationController = require("../controller/quotationController");
//ROUTES FOR USER
//create a route/api for signup
routes.post("/signup", userController.signUp);
// create a route for signIn
routes.post("/signin", userController.signIn);

//routes for quotation
//make api to create a quotation
routes.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  quotationController.createQuotation
);
//deleting quotation
routes.delete("/delete/:quotationId", quotationController.deleteQuotation);
//update quotation
routes.put("/update/:quotationId", quotationController.EditQuotation);
// to get all quotations
routes.get("/getall", quotationController.getAll);
module.exports = routes;
