const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    FoodName:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    },
    Price:{
        type:Number,
        require:true
    },
   FoodImage:{
    type:Buffer
   },
   stock:{
    type:Number,
    require:true
   },
   NoofOrders:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:"orders"
   }],
   createby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ShopUser"
   }
})

const food = mongoose.model("food",foodSchema)

module.exports = food