const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Review model  ==================//

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "userModel",
    },
    productId: {
      type: objectId,
      ref: "productModel",
    },
    message: String,
    reviewRatting: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviewModel", reviewSchema);
