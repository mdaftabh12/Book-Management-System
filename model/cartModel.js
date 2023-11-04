const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Cart model  ==================//

const cartModel = new mongoose.Schema(
  { 
    userId: {
      type: objectId,
      ref: "userModel",
    },
    productId: {
      type: objectId,
      ref: "productModel",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("cartModel", cartModel);
