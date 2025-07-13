const mongoose = require("mongoose")

const ShopOwnerSchema = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    Number:{
        type:Number,
        require:true
    },
    
    shopregister: {
    type: Boolean,
    default: false
  }
})

const ShopUser = mongoose.model("shopUser",ShopOwnerSchema)

module.exports = ShopUser