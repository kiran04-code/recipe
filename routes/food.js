const express = require("express")
const {cretashopuser ,shoplogin} = require("../controller/shopuser")
const order = require("../model/orders")
const food = require("../model/createfoodIteams")
const user = require("../model/user")
const router = express.Router()
router.get("/fooddeatils/:id",async(req,res)=>{
    const userid = req.params.id
    const data = await food.findById(userid)
    res.render("fooddeatils",{food:data, orderSuccess: false})
})
router.post("/order/place/:id",async(req,res)=>{
      const { address, paymentMethod ,quantity} = req.body;
  const foodItem = await food.findById(req.params.id);

  // Create a new Order
 const createOrderPass = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
 const data = await order.create({
    user: req.user._id,
    address,
    paymentMethod,
    quantity,
    orderpass:createOrderPass
  });
  foodItem.NoofOrders.push(data._id);
  await foodItem.save();
  res.render("fooddeatils", {food:foodItem, orderSuccess: true });
})
router.get("/add/card/:id",async (req,res)=>{
 const userid = req.params.id;
const data = await user.findById(req.user._id);

if (!data) {
  return res.status(404).send("User not found");
}
// Check if item already exists in cart
if (data.cart.includes(userid)) {
  // Optional: Flash a message or send feedback
  console.log("Item already in cart");
}
else{
    data.cart.push(userid);
await data.save();
res.redirect(`/fooddeatils/${userid}`);
}

})
router.get("/remove/cart/:id",async(req,res)=>{
const userid = req.params.id;
const data = await user.findById(req.user._id);

if (!data) {
  return res.status(404).send("User not found");
}
// If not, add to cart
data.cart.pop(userid);
await data.save();
res.redirect(`/profile`);
})
router.post("/cancel-order/:id",async(req,res)=>{
  const userid = req.params.id
  await order.findByIdAndDelete(userid)
  res.redirect("/shop/profile")
})
router.get("/viewproduct",async(req,res)=>{
 const data = await food.find({})
  res.render("viewproduct",{data1:data})
})
module.exports = router