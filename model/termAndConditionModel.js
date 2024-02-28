const mongoose = require("mongoose");

//====================  Term and condition model  ==================//

const termAndConditionSchema = new mongoose.Schema(
  {
    name: String,
    termAndCondition: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "termAndConditionModel",
  termAndConditionSchema
);
