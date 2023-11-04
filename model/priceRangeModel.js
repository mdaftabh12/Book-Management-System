const mongoose = require("mongoose");

//====================  Price range model  ==================//

const priceRangeSchema = new mongoose.Schema(
  {
    min: Number,
    max: Number,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("priceRangeModel", priceRangeSchema);
