const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
   quantity: {
        type: Number,
        default: 1
      },
  address: String,
  paymentMethod: String,
  orderpass:{
    type:String
  },
  orderDate: { type: Date, default: Date.now }
});
const order = mongoose.model("orders", orderSchema);
module.exports = order
