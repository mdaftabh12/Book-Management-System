const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Product model  ==================//
 
const productModel = new mongoose.Schema( 
  {
    name: String,
    categoryId: {
      type: objectId,
      ref: "categoryModel",
      default: null,
    },
    image: String,
    pictures: [],
    price: Number,
    stock: Number,
    sold: Number,
    productUniqueId: Number,
    discription: String,
    authorName: String,
    edition: Number,
    languageId: {
      type: objectId,
      ref: "languageModel",
      default: null,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productModel", productModel);
