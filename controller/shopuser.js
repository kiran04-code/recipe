const ShopUser = require("../model/shopuser")
const {createToken2} =  require('../service/authshopJWT')

async function cretashopuser(req,res){
    const {Name,Number,email} = req.body
try {
   await ShopUser.create({
    Name,
    email,
    Number
})

res.redirect("/shoplogin")
} catch (error) {
res.render("shopsignup",)   
}

}
 async function shoplogin(req,res){
    const {Name,Number} = req.body
try {
       const data =  await ShopUser.findOne({Number})
       if(data == null){
         res.render("shopsignin")
       }
       else{
         const token2 = createToken2(data)
        res.cookie("Shop__access_Token",token2).redirect("/")
       }
  } catch (error) {
     res.redirect("/shoplogin")
 }
 }
 
module.exports = { cretashopuser ,shoplogin}