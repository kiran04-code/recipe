const mongoose = require("mongoose")

const ShopDetilsSchema = new mongoose.Schema({
    shopName:{
        type:String,
        require:true
    },
     ownerName:{
        type:String,
        require:true
    },
    Adressofshop:{
        type:String,
        require:true
    },
    Typeofshop:{
        type:String,
        require:true
    },
    ContactEmail:{
        type:String,
        require:true
    },
    ShopImage:{
        type:Buffer,
    },
    AboutYourShop:{
         type:String,
        require:true
    },
    OpeningHours:{
       type:String,
       require:true 
    },
   PhoneNumber:{
    type:Number,
     require:true 
   },
   createby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ShopUser"
   }

})

const ShopDetails = mongoose.model("ShopDetails",ShopDetilsSchema)

module.exports = ShopDetails