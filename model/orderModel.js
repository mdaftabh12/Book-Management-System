const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Order model  ==================//
 
const orderSchema = new mongoose.Schema(
  {
    transectionId: String,
    userId: {
      type: objectId,
      ref: "userModel",
    },
    address: {},
    product: [
      {
        productId: {
          type: objectId,
          ref: "productModel",
        },
        price: Number,
        quantity: Number,
        discount: Number,
      },
    ],
    tax: Number,
    netAmount: Number,
    payableAmount: Number,
    taxAmount: Number,
    discount: Number,
    status: {
      type: String,
      enum: [
        "PENDING",
        "ORDER",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "RETURN_REQUESTED",
        "RETURNED",
      ],
      trim: true,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderModel", orderSchema);
