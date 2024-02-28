const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Language model  ==================//

const languageSchema = new mongoose.Schema(
  {
    name: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("languageModel", languageSchema);
