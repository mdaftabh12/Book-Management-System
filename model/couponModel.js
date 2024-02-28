const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Coupon model  ==================//

const couponSchema = new mongoose.Schema(
  {
    name: String,
    couponImage: String,
    category: [
      {
        type: objectId,
        ref: "categoryModel",
      },
    ],
    couponCode: String,
    minOrderValue: Number,
    maxDiscount: Number,
    discountInPercent: Number,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("couponModel", couponSchema);
