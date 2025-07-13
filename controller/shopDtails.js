const ShopDetails = require('../model/shopsdeatils')
const ShopUser = require("../model/shopuser")
const food = require("../model/createfoodIteams")
async function addShopDetails(req,res){
  const{shopName,ownerName,Adressofshop,Typeofshop,ContactEmail,PhoneNumber,AboutYourShop} = req.body
try {
    await ShopDetails.create({
    shopName,
    ownerName,
    Adressofshop,
    Typeofshop,
    Typeofshop,
    ContactEmail,
    PhoneNumber,
    PhoneNumber,
    AboutYourShop,
    createby:req.shopuser
  })
const  data = await ShopUser.findById(req.shopuser);
data.shopregister = true;
await data.save();
  res.redirect("/shop/profile")

} catch (error) {
   res.render("register-shop") 
}
}
async function createfoodIteams(req,res){
  const {FoodName,Description,Price,stock} = req.body
  await food.create({
  FoodName,
  Description,
  Price,
  stock,
  FoodImage:req.file.buffer,
  createby:req.shopuser
  })
  res.render("createfoodIteams",{error:"Your food has been punlish"})
 }
module.exports = {addShopDetails,createfoodIteams}