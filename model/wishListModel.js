const mongooge = require("mongoose");
const objectId = mongooge.Types.ObjectId;

//====================  Wishlist model  ==================//

const wishListSchema = new mongooge.Schema(
  {
    userId: {
      type: objectId,
      ref: "userModel",
    },
    productId: {
      type: objectId,
      ref: "productModel",
    },
  },
  { timestamps: true }
);

module.exports = mongooge.model("wishListModel", wishListSchema);
