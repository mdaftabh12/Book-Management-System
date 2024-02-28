const mongoose = require("mongoose");

//====================  Category model  ==================//

const categorySchema = new mongoose.Schema(
  {
    name: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categoryModel", categorySchema);
