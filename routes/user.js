const express = require("express");
const recipe = require('../model/createrecipe')
const food = require("../model/createfoodIteams")

const router = express.Router();
const {createuser,chekauth,googleLogin} = require("../controller/user");
const user = require("../model/user");
router.get("/",async(req,res)=>{
   const recipes = await recipe.find({}).populate("createby") 
      const data3 = await food.find({})
    res.render("index",{data:recipes,user:req.user,shop:req.shopuser,products:data3})
})
router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.get("/signin",(req,res)=>{
    res.render("signin")
})
router.get("/profile",async (req,res)=>{
    const users = await user.findById(req.user._id)
  .populate('allrecips')
  .populate('cart');
    res.render("profile",{user:req.user,data:users})
})
router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})
router.get("/userecips",async(req,res)=>{
  const users =    await recipe.find({})
    res.render("userecips",{data:users})
})
router.get("/profile/unsave/:id",async (req,res)=>{
 const users = await user.findById(req.user._id)
 users.allrecips.pop(req.params.id)
 await users.save();
 res.redirect("/profile")
})
router.post("/signup",createuser)
router.post("/signin",chekauth)
router.post("/auth/google",googleLogin)
module.exports = router;