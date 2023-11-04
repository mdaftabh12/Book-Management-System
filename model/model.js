const mongoose = require("mongoose");

//====================  model  ==================//

const modelSchema = new mongoose.Schema(
  {
    banner: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("model", modelSchema);