const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")

});

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs")

});

router.post("/login",savedRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login);

router.get("/logout",userController.logout);
module.exports= router;